import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTransactions } from "@/contexts/transactionsContext";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { COLOR } from "../../../constants/colors";

export default function FinancialHistory() {
  const { transactions, loading } = useTransactions();
  const [groupedTransactions, setGroupedTransactions] = useState<any>({});

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      // Urutkan transaksi berdasarkan tanggal terbaru
      const sorted = [...transactions].sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Kelompokkan berdasarkan bulan & tahun
      const grouped: any = {};
      sorted.forEach((t: any) => {
        const dateObj = new Date(t.date);
        const month = dateObj.toLocaleString("id-ID", { month: "long" });
        const year = dateObj.getFullYear();
        const key = `${month} ${year}`;

        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(t);
      });

      setGroupedTransactions(grouped);
    }
  }, [transactions, loading]);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {day: "2-digit"}); // hanya ambil tanggal (1-31)
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(groupedTransactions).map((monthYear) => (
          <View key={monthYear} style={styles.monthSection}>
            <Text style={styles.monthTitle}><MaterialIcons name="date-range" size={24} color={COLOR.white} /> {monthYear}</Text>

            {groupedTransactions[monthYear].map((t: any) => (
              <View style={styles.transactionRow} key={t._id}>
                <Text style={styles.date}>{formatDate(t.date)}</Text>
                <View style={styles.detailContainer}>
                  <Text
                    style={[
                      styles.type,
                      t.type === "income" ? styles.income : styles.spending,
                    ]}
                  >
                    {t.type === "income" ? "Income" : "Spending"}
                  </Text>
                  <Text style={styles.category}>{t.category}</Text>
                </View>
                <Text
                  style={[
                    styles.amount,
                    t.type === "income" ? styles.income : styles.spending,
                  ]}
                >
                  {t.nominal.toLocaleString("id-ID")}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "80%",
    padding: 10,
    backgroundColor: COLOR.secondary,
    borderRadius: 20,
  },
  monthSection: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.fourtiary,
  },
  monthTitle: {
    color: COLOR.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.fourtiary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  date: {
    color: COLOR.white,
    width: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailContainer: {
    flex: 1,
    marginLeft: 10,
  },
  type: {
    fontSize: 14,
    fontWeight: "600",
  },
  category: {
    fontSize: 12,
    color: COLOR.white,
    opacity: 0.7,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 14,
  },
  income: {
    color: "#4CAF50", // hijau
  },
  spending: {
    color: "#F44336", // merah
  },
});
