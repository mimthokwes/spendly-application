import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { COLOR } from "../../constants/colors";
import FinancialRecord from "./options/financialRecord";
import FinancialHistory from "./options/financialHistory";
import FinancialSavings from "./options/financialSavings"; // 🔹 Tambahkan komponen baru

export default function OptionsCatatan() {
  // 🔧 Perbaiki tipe agar savings terdaftar
  const [selected, setSelected] = useState<"record" | "history" | "savings">("record");

  return (
    <View style={styles.wrapper}>
      {/* 🔘 Tombol Pilihan */}
      <View style={styles.container}>
        <Pressable
          onPress={() => setSelected("record")}
          style={[styles.option, selected === "record" && styles.optionActive]}
        >
          <Text style={styles.text}>Notes</Text>
        </Pressable>

        <Pressable
          onPress={() => setSelected("history")}
          style={[styles.option, selected === "history" && styles.optionActive]}
        >
          <Text style={styles.text}>History</Text>
        </Pressable>

        {/* 🏦 Tombol Savings */}
        <Pressable
          onPress={() => setSelected("savings")}
          style={[styles.option, selected === "savings" && styles.optionActive]}
        >
          <Text style={styles.text}>Savings</Text>
        </Pressable>
      </View>

      {/* 📦 Konten yang berubah */}
      <View style={styles.content}>
        {selected === "record" ? (
          <FinancialRecord />
        ) : selected === "history" ? (
          <FinancialHistory />
        ) : (
          <FinancialSavings />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    // height: "150%",
    alignItems: "center",
  },
  container: {
    width: "95%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
   // flex: 1,
  // paddingHorizontal: 25,
    width: "32%",
    marginHorizontal: 3,
    backgroundColor: COLOR.secondary,
    borderRadius: 15,
    justifyContent: "center",
    height: 50,
  },
  optionActive: {
    backgroundColor: COLOR.fourtiary,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLOR.white,
    textAlign: "center",
  },
  content: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});
