// components/insights/FinancialRadar.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "@/contexts/transactionsContext";

type Props = {
  month: number; // 0–11
  year: number;
};

export default function FinancialRadar({ month, year }: Props) {
  const { transactions, loading } = useTransactions();
  const [values, setValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const labels = ["Income", "Spending", "Health", "Budget", "CashFlow", "Diversity"];

  useEffect(() => {
    if (loading || !transactions || transactions.length === 0) {
      setValues([0, 0, 0, 0, 0, 0]);
      return;
    }

    // Bulan & tahun yang dipilih user
    const currentYear = year;
    const currentMonth = month;

    // Bulan sebelumnya (untuk MoM growth)
    const prev = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = prev.getMonth();
    const prevYear = prev.getFullYear();

    // Filter transaksi per bulan-tahun
    const filterByMonthYear = (txs: any[], y: number, m: number) =>
      txs.filter((t: any) => {
        const d = new Date(t.date);
        return d.getFullYear() === y && d.getMonth() === m;
      });

    const currentMonthTx = filterByMonthYear(transactions, currentYear, currentMonth);
    const prevMonthTx = filterByMonthYear(transactions, prevYear, prevMonth);

    // Fungsi sumByType
    const sumByType = (txs: any[], type: string) =>
      txs
        .filter((t: any) => t.type === type)
        .reduce((acc: number, it: any) => acc + (Number(it.nominal) || 0), 0);

    // Totals
    const currIncome = sumByType(currentMonthTx, "income");
    const prevIncome = sumByType(prevMonthTx, "income");
    const currSpending = sumByType(currentMonthTx, "spending");
    const prevSpending = sumByType(prevMonthTx, "spending");

    // Helper: growth (Month-over-Month)
    const calcGrowth = (curr: number, prev: number) => {
      if (prev === 0) return curr === 0 ? 0 : 100;
      return ((curr - prev) / Math.abs(prev)) * 100;
    };
    const calcGrowthSpend = (curr: number, prev: number) => {
      if (prev === 0) return curr === 0 ? 0 : 100;
      return ((prev - curr) / Math.abs(prev)) * 100;
    };

    const incomeGrowth = calcGrowth(currIncome, prevIncome);
    const spendingGrowth = calcGrowthSpend(currSpending, prevSpending);

    // Budget Discipline
    const budgetDiscipline =
      currIncome === 0 ? 0 : Math.max(0, 100 - (currSpending / currIncome) * 100);

    // Cash Flow Stability
    const cashFlowStability =
      currSpending === 0 ? 100 : Math.min(100, (currIncome / currSpending) * 50);

    // Expense Diversity (jumlah kategori spending unik)
    const spendingCategories = currentMonthTx
      .filter((t: any) => t.type === "spending")
      .map((t: any) => (t.category ? String(t.category) : "Uncategorized"));
    const uniqueCategories = new Set(spendingCategories);
    const expenseDiversity = Math.min(100, (uniqueCategories.size / 6) * 100);

    // Health score
    const healthScore =
      (budgetDiscipline +
        cashFlowStability +
        (100 - Math.min(100, Math.abs(spendingGrowth)))) /
      3;

    // Normalisasi ke 0..100
    const normalize = (v: number) => {
      if (!isFinite(v) || isNaN(v)) return 0;
      if (v < 0) v = 0;
      if (v > 100) v = 100;
      return Number(v.toFixed(1));
    };

    const newValues = [
      normalize(Math.abs(incomeGrowth)),
      normalize(spendingGrowth),
      normalize(healthScore),
      normalize(budgetDiscipline),
      normalize(cashFlowStability),
      normalize(expenseDiversity),
    ];

    setValues(newValues);
  }, [transactions, loading, month, year]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Performance Insight –{" "}
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </Text>

      <View style={styles.chartContainer}>
        <RadarChart
          data={values}
          maxValue={100}
          chartSize={200}
          labels={labels}
        />

        <View style={styles.legendContainer}>
          {labels.map((l, i) => (
            <View key={l} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLOR.white }]} />
              <Text style={styles.legendText}>
                {l}: {values[i]?.toFixed(1) ?? 0}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.secondary,
    width: "95%",
    marginTop: 10,
    borderRadius: 25,
    padding: 22,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLOR.white,
    marginBottom: 4,
  },
  chartContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  legendContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    color: COLOR.white,
    fontSize: 13,
  },
});
