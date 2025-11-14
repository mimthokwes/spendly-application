import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { COLOR } from "../../../constants/colors";

export default function AllocationsMoney({
  name,
  percent,
  onChangeName,
  onChangePercent,
}: any) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Allocation Name (e.g., Konsumsi)"
        placeholderTextColor="#999"
        value={name}
        onChangeText={onChangeName}
      />
      <TextInput
        style={styles.input}
        placeholder="Percent (e.g., 60)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={percent}
        onChangeText={onChangePercent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  input: {
    backgroundColor: COLOR.black,
    color: COLOR.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "90%",
    marginBottom: 10,
  },
});
