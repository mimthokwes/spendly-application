import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import InsightsUser from "./(insights)/insightsUser";

export default function InsightUser() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.textTitle}>Insights</Text>
        <MaterialIcons
          name="insights"
          size={26}
          color={COLOR.white}
          style={{ marginLeft: 8 }}
        />
      </View>

      {/* Isi */}
      <View style={styles.content}>
        <InsightsUser />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.secondary,
    borderRadius: 20,
    width: "95%",
    alignSelf: "center",
    padding: 16,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textTitle: {
    color: COLOR.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "column",
    gap: 6,
  },
});
