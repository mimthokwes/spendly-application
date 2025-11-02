import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";


interface InputNumberProps {
  value?: string;
}
export default function InputNumber({ value = ""}: InputNumberProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {value.split("").map(() => "●").join(" ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "80%",
    backgroundColor: COLOR.white,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 28,
    letterSpacing: 6,
    color: COLOR.secondary,
    fontWeight: "600",
  },
});
