import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import { COLOR } from '../../constants/colors';
import FinancialRecord from './options/financialRecord';
import FinancialHistory from './options/financialHistory';


export default function OptionsCatatan() {
  const [selected, setSelected] = useState<"record" | "history">("record");

  return (
    <View style={styles.wrapper}>
      {/* 🔘 Tombol Pilihan */}
      <View style={styles.container}>
        <Pressable
          onPress={() => setSelected("record")}
          style={[
            styles.option,
            selected === "record" && styles.optionActive,
          ]}
        >
          <Text style={styles.text}>Financial Record</Text>
        </Pressable>

        <Pressable
          onPress={() => setSelected("history")}
          style={[
            styles.option,
            selected === "history" && styles.optionActive,
          ]}
        >
          <Text style={styles.text}>Financial History</Text>
        </Pressable>
      </View>

      {/* 📦 Konten yang berubah */}
      <View style={styles.content}>
        {selected === "record" ? (
          <FinancialRecord />
        ) : (
          <FinancialHistory />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "95%",
    marginTop: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    width: "49%",
    backgroundColor: COLOR.secondary,
    borderRadius: 15,
    justifyContent: "center",
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
    // borderRadius: 15,
    width: "100%",
    // height: 400,
    alignItems: "center",
  },
});
