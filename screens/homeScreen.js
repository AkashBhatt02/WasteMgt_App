import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Categories</Text>

      <TextInput
        placeholder="What do you need to recycle/dispose of?"
        style={styles.search}
      />

      {/* AI Lookup Button */}
      <TouchableOpacity
        style={styles.lookupButton}
        onPress={() => router.push("/camera")}
      >
        <Text style={styles.lookupText}>Lookup Item By Photo</Text>
      </TouchableOpacity>

      {/* Grid */}
      <View style={styles.grid}>
        <Card icon="trash-can" title="General Waste" color="#ff5c5c" />

        <Card icon="recycle" title="Recyclables" color="#ffcc00" />

        <Card
          icon="alert"
          title="Report Illegal Dumping"
          color="#ff8c00"
          onPress={() => router.push("/report")}
        />

        <Card icon="leaf" title="Organic Waste" color="#4caf50" />

        <Card icon="hammer" title="Construction Waste" color="#555" />

        <Card icon="laptop" title="E-Waste" color="#888" />
        <Card
          icon="clipboard-list"
          title="View Reports"
          color="#3b82f6"
          onPress={() => router.push("/viewReports")}
        />
        <Card
          icon="book-open-variant"
          title="Waste Guide"
          color="#4caf50"
          onPress={() => router.push("/wasteGuide")}
        />
      </View>
    </View>
  );
}

/* Card Component */
function Card({ icon, title, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={32} color="white" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  lookupButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  lookupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3, // nice shadow
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
});
