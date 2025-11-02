import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Welcome To Dahlan Study</Text>
      <Link href="/auth/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </Link>
      <Link href="/dashboard" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </Pressable>
      </Link>
    </View>
  );
}
