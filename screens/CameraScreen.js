import { View, Text, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CameraScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // helper: convert base64 to Uint8Array safely
  const base64ToUint8Array = (base64) => {
    const binaryString = global.atob
      ? global.atob(base64)
      : Buffer.from(base64, "base64").toString("binary");

    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const openCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert("Camera permission required");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.5,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;
      setLoading(true);

      // Read image as base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });

      console.log("Base64 length:", base64Image.length);

      // Convert to binary
      const binaryImage = base64ToUint8Array(base64Image);

      // Call Hugging Face API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/resnet-50",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/octet-stream",
          },
          body: binaryImage,
        }
      );

      const data = await response.json();
      console.log("HF Response:", data);

      setLoading(false);

      if (!Array.isArray(data)) {
        alert("Model loading or API error. Try again.");
        return;
      }

      const prediction = data[0]?.label || "Unknown";

      router.push({
        pathname: "/result",
        params: {
          image: imageUri,
          prediction: prediction,
        },
      });

    } catch (error) {
      console.log("AI Error:", error);
      setLoading(false);
      alert("AI classification failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Analyzing image...</Text>
        </>
      ) : (
        <Button title="Open Camera" onPress={openCamera} />
      )}
    </View>
  );
}
