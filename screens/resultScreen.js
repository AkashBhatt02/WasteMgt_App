import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const { image, prediction } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Prediction</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <Text style={styles.result}>{prediction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 220, height: 220, marginVertical: 20 },
  result: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold" },
});
