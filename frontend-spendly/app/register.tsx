import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { COLOR } from "../constants/colors";
import InputNumber from "@/components/loginComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";
import { EXPO_PUBLIC_API_URL } from "@env";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNumeric, setShowNumeric] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${EXPO_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { username, email, password },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("email", email);
        Alert.alert("Success", data.message || "Registration successful!");
        router.replace("/login");
      } else {
        Alert.alert("Error", data.message || "Failed to register");
      }
    } catch (error) {
      console.error("Error registering:", error);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  const handleNumberPress = (value: string) => {
    if (value === "ENTER") {
      handleRegister();
    } else if (value === "DELETE") {
      setPassword(password.slice(0, -1));
    } else if (password.length < 6) {
      setPassword(password + value);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.createAccount}>Create Account</ThemedText>

      {!showNumeric && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Button title="Set Password" onPress={() => setShowNumeric(true)}/>
        </>
      )}

      {showNumeric && (
        <>
          <InputNumber value={password} />
          <PasswordNumber onPress={handleNumberPress} />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.primary,
    padding: 20,
  },
  createAccount: {
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
