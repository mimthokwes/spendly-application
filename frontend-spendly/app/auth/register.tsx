import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { COLOR } from "../../constants/colors";
import InputNumber from "@/components/loginComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";

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
      const res = await fetch(`http://192.168.110.184:3001/api/users/register`, {
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
        router.replace("/auth/login");
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
      setPassword((p) => p.slice(0, -1));
    } else if (password.length < 6) {
      setPassword((p) => p + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createAccount}>Create Account</Text>
      {/* Wrapper untuk input teks */}
      {!showNumeric && (
        <View style={styles.formWrapper}>
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

          <Button title="Set Password" onPress={() => setShowNumeric(true)} />
        </View>
      )}

      {/* Wrapper untuk numeric keypad */}
      {showNumeric && (
        <View style={styles.formWrapper}>
          <InputNumber value={password} />
          <PasswordNumber onPress={handleNumberPress} />
          <View style={{ marginTop: 12, width: "100%" }}>
            <Button title="Back" onPress={() => setShowNumeric(false)} />
          </View>
        </View>
      )}
    </View>
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
  formWrapper: {
    width: "100%",
    alignItems: "center",
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
