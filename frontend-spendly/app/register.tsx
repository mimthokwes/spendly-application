import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { COLOR } from "../constants/colors";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = Constants.expoConfig?.extra?.API_URL; // ambil dari .env

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            username,
            email,
            password,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // simpan ke local storage
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("email", email);

        Alert.alert("Success", data.message || "Registration successful");
        router.replace("/login");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Create Account</ThemedText>

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
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Register" color={COLOR.secondary} onPress={handleRegister} />
      </View>
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
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
});
