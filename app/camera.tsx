import { View, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const router = useRouter();

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.5,
      base64: false,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      try {
        // Convert image to base64
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Send to Hugging Face
        const response = await fetch(
          "https://api-inference.huggingface.co/models/microsoft/resnet-50",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer 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",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: base64Image,
            }),
          }
        );

        const data = await response.json();

        // Get top prediction label
        const prediction = data[0]?.label || "Unknown Waste";

        // Navigate to result screen
        router.push({
          pathname: "/result",
          params: {
            image: imageUri,
            prediction: prediction,
          },
        });

      } catch (error) {
        console.log(error);
        alert("AI classification failed");
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Take Waste Photo</Text>
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
}
