import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { COLOR } from "../../constants/colors";
import InputNumber from "@/components/registerComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";
import { ENV } from "../../env";

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
      const res = await fetch(`${ENV.API_URL}/users/register`, {
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
        router.push("/auth/login");
      } else {
        Alert.alert("Error", data.message || "Failed to register");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect the server");
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

      {!showNumeric && (
        <View style={styles.formWrapper}>
          <Text style={styles.createAccount}>Create Account</Text>
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowNumeric(true)}
          >
            <Text style={styles.buttonText}>Set Password</Text>
          </TouchableOpacity>
        </View>
      )}

      {showNumeric && (
        <View style={styles.formWrapperPassword}>
          <Text style={styles.createPassword}>Set Your Password</Text>
          <InputNumber value={password} />
          <PasswordNumber onPress={handleNumberPress}/>
          <TouchableOpacity
            style={[styles.buttonBack, { marginTop: 12, }]}
            onPress={() => setShowNumeric(false)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
    marginTop:20,
    marginBottom: 50,
    color: "#fff",
    fontSize: 34,
  },
  createPassword: {
    fontWeight: "bold",
    marginTop:20,
    marginBottom: 50,
    color: "#fff",
    fontSize: 28,
  },
  formWrapper: {
    width: "100%",
    alignItems: "center",
  },
    formWrapperPassword: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
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
  PasswordNumber: {
    position: "absolute",
    bottom: 0,
  },
  button: {
    backgroundColor: "#4e9bde",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonBack: {
   // position: "absolute",
    bottom: 0,
    backgroundColor: "#4e9bde",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 25,
    alignItems: "center",
 //   marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
