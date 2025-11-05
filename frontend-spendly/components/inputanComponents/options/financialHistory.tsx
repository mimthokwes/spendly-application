import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { COLOR } from "@/constants/colors";

export default function FinancialHistory() {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Financial History</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "80%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
  },
  text: {
    color: COLOR.white,
  },
  wrap: {
    borderRadius: 25,
    // overflow: "hidden",
  },
  wrapper: {
    width: 300,
    height: 600,
    alignItems: "center",
    paddingTop: 10,
    //  justifyContent: "center",
    backgroundColor: COLOR.fourtiary,
  },
});
