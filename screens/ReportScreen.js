import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import { reports } from "./reportStore";

export default function ReportScreen() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);

  const takePhoto = async () => {
    try {
      // Camera permission
      const camPerm = await ImagePicker.requestCameraPermissionsAsync();
      if (!camPerm.granted) {
        alert("Camera permission required");
        return;
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.5,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      setPhotoTaken(true);

      // Get location
      const locPerm = await Location.requestForegroundPermissionsAsync();
      if (!locPerm.granted) {
        alert("Location permission required");
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      setLocation(locationResult.coords);

    } catch (error) {
      console.log(error);
      alert("Error taking photo");
    }
  };

  const submitReport = () => {
    if (!image || !location) {
      alert("Missing photo or location");
      return;
    }

    reports.push({
      image: image,
      latitude: location.latitude,
      longitude: location.longitude,
      description: description,
      time: new Date().toLocaleString(),
    });

    alert("Report submitted successfully");

    // Reset form
    setImage(null);
    setLocation(null);
    setDescription("");
    setPhotoTaken(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report Illegal Dumping</Text>

      {!photoTaken && (
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButtonText}>Take Photo</Text>
        </TouchableOpacity>
      )}

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      {photoTaken && (
        <>
          <Text style={styles.label}>Describe the problem</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Garbage dumped near roadside, strong smell, needs urgent cleaning..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {location && (
            <Text style={styles.locationText}>
              Location Captured:
              {"\n"}
              Latitude: {location.latitude.toFixed(5)}
              {"\n"}
              Longitude: {location.longitude.toFixed(5)}
            </Text>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 12,
  },
  label: {
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlignVertical: "top",
  },
  locationText: {
    marginTop: 15,
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
