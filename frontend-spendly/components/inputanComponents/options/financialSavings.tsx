import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOR } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useSavings } from "@/contexts/savingsContext";

export default function FinancialSavings() {
  const { saving, depositSaving, withdrawSaving, loading, refreshSaving, createSaving } = useSavings();

  const [nominal, setNominal] = useState("");
  const [rawNominal, setRawNominal] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [categories] = useState([
    "Menabung Harian",
    "Gaji / Income",
    "Investasi",
    "Dana Darurat",
    "Lainnya",
  ]);

  // Format tanggal
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Ganti tanggal dari DatePicker
  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS === "android") setShowDatePicker(false);
  };

  // Format nominal input
  const handleNominalChange = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    if (!numeric) {
      setRawNominal(null);
      setNominal("");
      return;
    }
    const numberValue = Number(numeric);
    setRawNominal(numberValue);
    const formatted = numberValue.toLocaleString("id-ID");
    setNominal(formatted);
  };

  // Deposit
  const handleDeposit = async () => {
    if (!rawNominal || !category) {
      Alert.alert("Warning", "Harap isi nominal dan kategori!");
      return;
    }
    // jika ternyata users belum pernah buat akun saving, maka akan otomatis membuat akun saving saat handlesaving ditekan
    if (!saving){
      createSaving();
    }

    try {
      await depositSaving({
        nominal: rawNominal,
        category,
        description,
      });
      Alert.alert("Success", "Tabungan berhasil ditambahkan!");
      setNominal("");
      setRawNominal(null);
      setCategory("");
      setDescription("");
      setDate(new Date());

      // refresh otomatis setelah deposit
      await refreshSaving?.();
    } catch (error) {
      Alert.alert("Error", "Gagal menambah tabungan!");
      console.error(error);
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    if (saving?.total < {rawNominal}) {
      Alert.alert("Warning", "Saldo tidak mencukupi!");
      return;
    }
    if (!rawNominal || !category) {
      Alert.alert("Warning", "Harap isi nominal dan kategori!");
      return;
    }

    try {
      await withdrawSaving({
        nominal: rawNominal,
        category,
        description,
      });
      Alert.alert("Success", "Penarikan tabungan berhasil!");
      setNominal("");
      setRawNominal(null);
      setCategory("");
      setDescription("");
      setDate(new Date());

      // refresh otomatis setelah withdraw
      await refreshSaving?.();
    } catch (error) {
      Alert.alert("Error", "Gagal menarik tabungan!");
      console.error(error);
    }
  };

  // 🔄 Refresh otomatis saat saving berubah
  useEffect(() => {
    refreshSaving?.();
  }, [depositSaving, withdrawSaving, saving]);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        {/* 💰 Info Total */}
        <Text style={styles.totalText}>
          Total Savings:{" "}
          <Text style={styles.totalAmount}>
            Rp {saving?.total?.toLocaleString("id-ID") ?? 0}
          </Text>
        </Text>

        {/* Nominal */}
        <View style={styles.wrapper}>
          <MaterialIcons
            name="attach-money"
            size={28}
            color={COLOR.white}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nominal"
            placeholderTextColor={COLOR.grey}
            keyboardType="numeric"
            value={nominal}
            onChangeText={handleNominalChange}
          />
        </View>

        {/* Category */}
        <View style={styles.wrapper}>
          <MaterialIcons
            name="category"
            size={28}
            color={COLOR.white}
            style={styles.icon}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              dropdownIconColor={COLOR.white}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" color={COLOR.grey} />
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} color={COLOR.black} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Date */}
        <View style={styles.wrapper}>
          <MaterialIcons
            name="date-range"
            size={28}
            color={COLOR.white}
            style={styles.icon}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[styles.input, styles.dateInput]}
          >
            <Text style={{ color: COLOR.white }}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        {/* Description */}
        <View style={styles.wrapper}>
          <MaterialIcons
            name="description"
            size={28}
            color={COLOR.white}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            placeholder="Description (Optional)"
            placeholderTextColor={COLOR.grey}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* 🟢 Deposit & 🔴 Withdraw */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: COLOR.grey }]}
            onPress={handleDeposit}
            disabled={loading}
          >
            <Text style={styles.submitText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: COLOR.grey }]}
            onPress={handleWithdraw}
            disabled={loading}
          >
            <Text style={styles.submitText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "80%",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: COLOR.secondary,
    paddingVertical: 10,
  },
  wrap: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
  },
  totalText: {
    color: COLOR.white,
    fontSize: 16,
    marginBottom: 10,
  },
  totalAmount: {
    color: COLOR.green,
    fontWeight: "bold",
  },
  wrapper: {
    width: "90%",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    backgroundColor: COLOR.black,
    color: COLOR.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "85%",
    height: 50,
  },
  pickerContainer: {
    backgroundColor: COLOR.black,
    borderRadius: 10,
    width: "85%",
    justifyContent: "center",
    height: 50,
  },
  picker: {
    color: COLOR.white,
    width: "100%",
    height: "100%",
  },
  dateInput: {
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 25,
  },
  submitBtn: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  submitText: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
