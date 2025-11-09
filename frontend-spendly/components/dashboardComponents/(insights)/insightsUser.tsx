import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../../constants/colors";
import { useTransactions } from "@/contexts/transactionsContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function InsightsUser() {
  const { transactions, loading } = useTransactions();
  const [assetGrowth, setAssetGrowth] = useState<number | null>(null);
  const [spendingGrowth, setSpendingGrowth] = useState<number | null>(null);
  const [yoyAssetGrowth, setYoyAssetGrowth] = useState<number | null>(null);
  const [yoySpendingGrowth, setYoySpendingGrowth] = useState<number | null>(null);
  const [spendingToIncome, setSpendingToIncome] = useState<number | null>(null);
  const [financialScore, setFinancialScore] = useState<number | null>(null);

  useEffect(() => {
    if (loading || transactions.length === 0) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    const sameMonthLastYear = new Date(currentYear - 1, currentMonth, 1);

    const filterByMonthYear = (tx: any[], year: number, month: number) =>
      tx.filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

    const currentMonthTx = filterByMonthYear(transactions, currentYear, currentMonth);
    const prevMonthTx = filterByMonthYear(transactions, prevMonth.getFullYear(), prevMonth.getMonth());
    const lastYearTx = filterByMonthYear(transactions, sameMonthLastYear.getFullYear(), sameMonthLastYear.getMonth());

    // === Total Income & Spending (Current, Previous, Last Year) ===
    const sum = (tx: any[], type: string) =>
      tx.filter((item) => item.type === type).reduce((a, b) => a + b.nominal, 0);

    const currIncome = sum(currentMonthTx, "income");
    const currSpending = sum(currentMonthTx, "spending");
    const prevIncome = sum(prevMonthTx, "income");
    const prevSpending = sum(prevMonthTx, "spending");
    const lastYearIncome = sum(lastYearTx, "income");
    const lastYearSpending = sum(lastYearTx, "spending");

    // === Growth Month to Month ===
    const calcGrowth = (curr: number, prev: number) =>
      prev === 0 ? 0 : ((curr - prev) / prev) * 100;

    setAssetGrowth(calcGrowth(currIncome, prevIncome));
    setSpendingGrowth(calcGrowth(currSpending, prevSpending));

    // === YOY Growth ===
    setYoyAssetGrowth(calcGrowth(currIncome, lastYearIncome));
    setYoySpendingGrowth(calcGrowth(currSpending, lastYearSpending));

    // === Spending to Income Ratio ===
    const ratio = currIncome === 0 ? 0 : (currSpending / currIncome) * 100;
    setSpendingToIncome(ratio);

    // === Financial Health Score ===
    // Asumsi: semakin kecil spending/income ratio, semakin sehat.
    // Kita buat skala sederhana.
    let score = 100 - ratio;
    if (score < 0) score = 0;
    setFinancialScore(score);
  }, [transactions, loading]);

  const getHealthStatus = (score: number) => {
    if (score >= 80) return "Sehat 💪";
    if (score >= 60) return "Cukup ⚖️";
    return "Kritis 🚨";
  };

  return (
    <View style={styles.container}>
      {/* Income Growth */}
      {assetGrowth !== null && assetGrowth >= 5 &&(
        <View style={styles.row}>
          <MaterialIcons
            name="trending-up"
            size={20}
            color={assetGrowth >= 0 ? COLOR.green : COLOR.red}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.text}>
            Income {assetGrowth >= 0 ? "naik" : "turun"} {Math.abs(assetGrowth).toFixed(1)}% dibanding bulan lalu
          </Text>
        </View>
      )}

      {/* Spending Growth */}
      {spendingGrowth !== null && (
        <View style={styles.row}>
          <MaterialIcons
            name="trending-up"
            size={20}
            color={spendingGrowth >= 0 ? COLOR.red : COLOR.green}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.text}>
            Spending {spendingGrowth >= 0 ? "naik" : "turun"} {Math.abs(spendingGrowth).toFixed(1)}% dibanding bulan lalu
          </Text>
        </View>
      )}

      {/* Spending Warning */}
      {spendingToIncome !== null && spendingToIncome >= 85 && (
        <View style={styles.row}>
          <MaterialIcons name="warning" size={20} color={COLOR.yellow} style={{ marginRight: 6 }} />
          <Text style={[styles.text, { color: COLOR.yellow }]}>
            Spending bulan ini mencapai {spendingToIncome.toFixed(1)}% dari income — hati-hati pengeluaran membengkak!
          </Text>
        </View>
      )}

      {/* YOY Insight */}
      {yoyAssetGrowth !== null && yoyAssetGrowth >= 2 && (
        <View style={styles.row}>
          <MaterialIcons
            name="calendar-today"
            size={18}
            color={yoyAssetGrowth >= 0 ? COLOR.green : COLOR.red}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.text}>
            Income {yoyAssetGrowth >= 0 ? "naik" : "turun"} {Math.abs(yoyAssetGrowth).toFixed(1)}% dibanding tahun lalu
          </Text>
        </View>
      )}

      {yoySpendingGrowth !== null && yoySpendingGrowth >= 1 && (
        <View style={styles.row}>
          <MaterialIcons
            name="calendar-today"
            size={18}
            color={yoySpendingGrowth >= 0 ? COLOR.red : COLOR.green}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.text}>
            Spending {yoySpendingGrowth >= 0 ? "naik" : "turun"} {Math.abs(yoySpendingGrowth).toFixed(1)}% dibanding tahun lalu
          </Text>
        </View>
      )}

      {/* Financial Health Score */}
      {financialScore !== null && (
        <View style={[styles.row, { marginTop: 6 }]}>
          <MaterialIcons
            name="health-and-safety"
            size={20}
            color={
              financialScore >= 80
                ? COLOR.green
                : financialScore >= 60
                ? COLOR.yellow
                : COLOR.red
            }
            style={{ marginRight: 6 }}
          />
          <Text style={styles.text}>
            Financial Health Score: {financialScore.toFixed(0)} ({getHealthStatus(financialScore)})
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  text: {
    color: COLOR.white,
    fontSize: 14,
    flexShrink: 1,
  },
});
