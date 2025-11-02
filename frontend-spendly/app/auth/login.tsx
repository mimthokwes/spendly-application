import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Alert } from "react-native";
import Profile from "@/components/loginComponents/profile";
import InputNumber from "@/components/loginComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primary,
  },
});



export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedUsername && storedEmail) {
          setUsername(storedUsername);
          setEmail(storedEmail);
        } else {
          router.replace("/auth/register");
        }
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };
    getUserInfo();
  }, []);

  const handlePress = async (value: any) => {
    if (value === "ENTER") {
      console.log("Entered password:", password);
      try {
        const res = await fetch("http://192.168.110.184:3001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email,
              password,
            },
          }),
        });
        const data = await res.json();
        if (res.ok) {
          Alert.alert("Success Login Walcome", data.message);
          router.replace("/dashboard");
        } else {
          Alert.alert("Error", data.message);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        Alert.alert("Error", "Failed to connect the server");
      }
    } else if (value === "DELETE") {
      setPassword(password.slice(0, -1)); // hapus 1 karakter terakhir
    } else {
      if (password.length < 6) {
        setPassword(password + value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Profile
        imageSource={require("../../assets/images/favicon.png")}
        username={username}
      />
      <InputNumber value={password} />
      <PasswordNumber onPress={handlePress} />
    </View>
  );
}
