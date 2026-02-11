import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { reports } from "./reportStore";

export default function ViewReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reported Dumpings</Text>

      {reports.length === 0 && (
        <Text style={styles.noReports}>No reports yet</Text>
      )}

      {reports.map((report, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: report.image }} style={styles.image} />

          <Text style={styles.label}>Problem Description:</Text>
          <Text style={styles.text}>
            {report.description || "No description provided"}
          </Text>

          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>
            Latitude: {report.latitude.toFixed(5)}
          </Text>
          <Text style={styles.text}>
            Longitude: {report.longitude.toFixed(5)}
          </Text>

          <Text style={styles.label}>Reported At:</Text>
          <Text style={styles.text}>{report.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noReports: {
    textAlign: "center",
    color: "gray",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 5,
  },
  text: {
    marginBottom: 5,
  },
});
