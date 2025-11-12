import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "../../constants/colors";

type Props = {
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
};

export default function SpandukLaporan({ month, year, setMonth, setYear }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i); // contoh: 5 tahun lalu - 5 tahun depan

  const handleSelect = (m: number, y: number) => {
    setMonth(m);
    setYear(y);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Financial Analysis</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.textDate}>
            {monthNames[month]} {year} ▼
          </Text>
        </TouchableOpacity>
      </View>
      <MaterialIcons name="insert-chart" size={38} color={COLOR.white} />

      {/* Modal untuk pilih bulan & tahun */}
      <Modal visible={showPicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Bulan & Tahun</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {years.map((y) => (
                <View key={y} style={styles.yearSection}>
                  <Text style={styles.yearText}>{y}</Text>
                  <View style={styles.monthGrid}>
                    {monthNames.map((m, idx) => (
                      <Pressable
                        key={m}
                        style={[
                          styles.monthButton,
                          month === idx  && year === y && styles.activeMonth,
                        ]}
                        onPress={() => handleSelect(idx , y)} //ini bagian error date nya
                      >
                        <Text
                          style={[
                            styles.monthText,
                            month === idx  && year === y && styles.activeMonthText,
                          ]}
                        >
                          {m.slice(0, 3)}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
    padding: 40,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLOR.white,
  },
  textDate: {
    fontSize: 16,
    color: COLOR.grey,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLOR.black || "#1e1e1e",
    padding: 20,
    borderRadius: 16,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    color: COLOR.white,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  yearSection: {
    marginBottom: 12,
  },
  yearText: {
    color: COLOR.grey,
    marginBottom: 6,
    fontWeight: "600",
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  monthButton: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
  },
  activeMonth: {
    backgroundColor: COLOR.primary,
  },
  monthText: {
    color: COLOR.grey,
    fontSize: 13,
  },
  activeMonthText: {
    color: COLOR.white,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLOR.white,
    textAlign: "center",
    fontWeight: "bold",
  },
});
