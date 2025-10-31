import React, { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { View,StyleSheet } from "react-native";
import Profile from "@/components/loginComponents/profile";
import InputNumber from "@/components/loginComponents/inputNumber";
import PasswordNumber from "@/components/loginComponents/passwordNumber";
import {COLOR} from '../constants/colors'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.primary,

    },
});



export default function LoginScreen() {
    const [password, setPassword] = useState("");

      const handlePress = (value) => {
	 if (value === "ENTER") {
	   console.log("Entered password:", password);
				      // Tambahkan aksi validasi di sini
	} else if (value === "DELETE") {
           setPassword(password.slice(0, -1)); // hapus 1 karakter terakhir
        } else {
	if (password.length < 6) {
	setPassword(password + value);
	}
        }
};

    return (
        <ThemedView style={styles.container}>
            <Profile 
	    imageSource={require("../assets/images/favicon.png")}
	    username="Walcome Mr. Dahlan" 
	    />
	    <InputNumber value={password} />
	    <PasswordNumber onPress={handlePress} />
        </ThemedView>
    );
}
