import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

export default function WasteGuideScreen() {
  const [selected, setSelected] = useState(null);

  const wasteData = {
    Dry: "Examples: Plastic, paper, metal.\nDispose in blue recycling bin.",
    Wet: "Examples: Food waste, vegetable peels.\nDispose in green compost bin.",
    EWaste: "Examples: Mobile phones, chargers, batteries.\nTake to authorized e-waste centers."
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Waste Segregation Guide</Text>

      <TouchableOpacity style={styles.card} onPress={() => setSelected("Dry")}>
        <Text style={styles.cardTitle}>Dry Waste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => setSelected("Wet")}>
        <Text style={styles.cardTitle}>Wet Waste</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => setSelected("EWaste")}>
        <Text style={styles.cardTitle}>E-Waste</Text>
      </TouchableOpacity>

      {selected && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{wasteData[selected]}</Text>
        </View>
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
  card: {
    width: "100%",
    backgroundColor: "#4caf50",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  infoText: {
    fontSize: 16,
  },
});
