
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";

export default function PasswordNumber({ onPress }) {
  const rows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["DELETE", "0", "ENTER"],
  ];

  return (
    <View style={styles.keypad}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.circle,
                item === "ENTER" && styles.enterButton,
                item === "DELETE" && styles.deleteButton,
              ]}
              onPress={() => onPress(item)}
            >
              <Text
                style={[
                  styles.text,
                  item === "ENTER" && styles.enterText,
                  item === "DELETE" && styles.deleteText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
    marginBottom: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  circle: {
    height: 60,
    width: 60,
    backgroundColor: COLOR.white,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  enterButton: {
    backgroundColor: COLOR.primary,
    width: 100,
    borderRadius: 30,
  },
  deleteButton: {
    backgroundColor: COLOR.danger || "tomato", // fallback jika belum ada COLOR.danger
    width: 100,
    borderRadius: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.secondary,
  },
  enterText: {
    color: COLOR.white,
    fontSize: 16,
  },
  deleteText: {
    color: COLOR.white,
    fontSize: 16,
  },
});
