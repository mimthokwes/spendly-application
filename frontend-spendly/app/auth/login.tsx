import InputNumber from "@/components/loginComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";
import Profile from "@/components/loginComponents/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { COLOR } from "../../constants/colors";
import { setToken } from "../../contexts/authStore";
import { ENV } from "../../env";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primary,
    paddingBottom: 40,
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
          router.push("/auth/register");
        }
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };
    getUserInfo();
  }, []);

  const handlePress = async (value: any) => {
    if (value === "ENTER") {
      // console.log("Entered password:", password);
      if (!email) {
        Alert.alert("Error", "Email not found");
        router.replace("/auth/register");
        return;
      }
      try {
        const res = await fetch(`${ENV.API_URL}/users/login`, {
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
          setToken(data.data.token);
          router.push({
            pathname: "/dashboard",
          });
        } else {
          Alert.alert("Error", "Password Salah", data.message);
        }

        if (data.token) {
          setToken(data.token); // simpan ke context
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
        username={username}
      />
      <InputNumber value={password} />
      <PasswordNumber onPress={handlePress} />
    </View>
  );
}
