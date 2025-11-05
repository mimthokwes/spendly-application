import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { COLOR } from "@/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useTransactions } from "@/contexts/transactionsContext";

export default function FinancialRecord() {
  const { addTransaction } = useTransactions();

  const [type, setType] = useState("");
  const [nominal, setNominal] = useState(""); // tampilannya (diformat)
  const [rawNominal, setRawNominal] = useState<number | null>(null); // angka murni
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  // ✅ Saat user mengetik nominal
  const handleNominalChange = (text: string) => {
    // Hapus karakter selain angka
    const numeric = text.replace(/\D/g, "");

    if (!numeric) {
      setRawNominal(null);
      setNominal("");
      return;
    }

    const numberValue = Number(numeric);
    setRawNominal(numberValue);

    // Format tampilan ke locale Indonesia (contoh: 10.000)
    const formatted = numberValue.toLocaleString("id-ID");
    setNominal(formatted);
  };

  const handleAddTransaction = async () => {
    if (!type || !rawNominal || !category) {
      Alert.alert("Warning", "Please fill in all required fields!");
      return;
    }

    const transaction = {
      type,
      nominal: rawNominal, // 🔥 kirim angka murni ke backend
      category,
      description,
      date: date.toISOString(),
    };

    try {
      await addTransaction(transaction);
      Alert.alert("Success", "Transaction added successfully!");
      setType("");
      setNominal("");
      setRawNominal(null);
      setCategory("");
      setDescription("");
      setDate(new Date());
    } catch (error) {
      Alert.alert("Error", "Failed to add transaction.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        {/* Type */}
        <View style={styles.wrapper}>
          <MaterialIcons
            name="compare-arrows"
            size={28}
            color={COLOR.white}
            style={styles.icon}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              dropdownIconColor={COLOR.white}
              style={styles.picker}
            >
              <Picker.Item label="Select Type" value="" color={COLOR.grey} />
              <Picker.Item label="Income" value="income" color={COLOR.black} />
              <Picker.Item label="Spending" value="spending" color={COLOR.black} />
            </Picker>
          </View>
        </View>

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
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor={COLOR.grey}
            value={category}
            onChangeText={setCategory}
          />
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
            <Text style={{ color: COLOR.white }}>
              {date ? formatDate(date) : "Select Date (Optional)"}
            </Text>
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

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleAddTransaction}>
          <Text style={styles.submitText}>Add Transaction</Text>
        </TouchableOpacity>
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
  submitBtn: {
    marginTop: 25,
    backgroundColor: COLOR.primary,
    width: "85%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
