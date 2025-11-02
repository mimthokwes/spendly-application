import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Ini halaman Dashboard utama</Text>
      <Link href="/"> to apps</Link>
    </View>
  );
}

