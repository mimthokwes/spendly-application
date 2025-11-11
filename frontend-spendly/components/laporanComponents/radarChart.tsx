// components/insights/FinancialRadar.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "@/contexts/transactionsContext";

/**
 * FinancialRadar
 * - Membaca transactions dari context
 * - Menghitung 6 metrik
 * - Mengirim data sebagai number[] ke RadarChart (sesuai tipe yang diharapkan)
 */

export default function FinancialRadar() {
  const { transactions, loading } = useTransactions();

  const [values, setValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const labels = ["Income", "Spending", "Health", "Budget", "CashFlow", "Diversity"];

  useEffect(() => {
    if (loading || !transactions || transactions.length === 0) {
      setValues([0, 0, 0, 0, 0, 0]);
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // previous month (for MoM growth)
    const prev = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = prev.getMonth();
    const prevYear = prev.getFullYear();

    const filterByMonthYear = (txs: any[], y: number, m: number) =>
      txs.filter((t: any) => {
        const d = new Date(t.date);
        return d.getFullYear() === y && d.getMonth() === m;
      });

    const currentMonthTx = filterByMonthYear(transactions, currentYear, currentMonth);
    const prevMonthTx = filterByMonthYear(transactions, prevYear, prevMonth);

    const sumByType = (txs: any[], type: string) =>
      txs.filter((t: any) => t.type === type).reduce((acc: number, it: any) => acc + (Number(it.nominal) || 0), 0);

    // Totals
    const currIncome = sumByType(currentMonthTx, "income");
    const prevIncome = sumByType(prevMonthTx, "income");
    const currSpending = sumByType(currentMonthTx, "spending");
    const prevSpending = sumByType(prevMonthTx, "spending");

    // helper: percent growth (MoM)
    const calcGrowth = (curr: number, prev: number) => {
      if (prev === 0) return curr === 0 ? 0 : 100; // kalau prev 0 tapi curr >0 => treat as 100%
      return ((curr - prev) / Math.abs(prev)) * 100;
    };
    const calcGrowthSpend = (curr: number, prev: number) => {
      if (prev === 0) return curr === 0 ? 0 : 100; // kalau prev 0 tapi curr >0 => treat as 100% 
      return ((prev - curr) / Math.abs(prev)) * 100;
    }

    const incomeGrowth = calcGrowth(currIncome, prevIncome); // bisa negatif
    const spendingGrowth = calcGrowthSpend(currSpending, prevSpending); // bisa negatif

    // Budget Discipline = 100 - (spending / income * 100)
    const budgetDiscipline =
      currIncome === 0 ? 0 : Math.max(0, 100 - (currSpending / currIncome) * 100);

    // Cash Flow Stability - skala 0..100.
    // Jika spending 0 => stabil 100. else gunakan ratio income/spending lalu remap ke 0..100
    // Kita cap pada 100 agar tidak overflow.
    const cashFlowStability =
      currSpending === 0 ? 100 : Math.min(100, (currIncome / currSpending) * 50); // faktor 50 agar rasio 2 -> 100

    // Expense Diversity: seberapa banyak kategori spending unik (0..100) — target 6 kategori = 100%
    const spendingCategories = currentMonthTx
      .filter((t: any) => t.type === "spending")
      .map((t: any) => (t.category ? String(t.category) : "Uncategorized"));
    const uniqueCategories = new Set(spendingCategories);
    const expenseDiversity = Math.min(100, (uniqueCategories.size / 6) * 100);

    // Financial Health Score: gabungan indikator (semakin tinggi semakin sehat)
    // Formula sederhana: rata-rata dari budgetDiscipline, cashFlowStability, dan (100 - |spendingGrowth|)
    const healthScore =
      (budgetDiscipline + cashFlowStability + (100 - Math.min(100, Math.abs(spendingGrowth)))) / 3;

    // Normalisasi semua nilai ke rentang 0..100 dan fix decimal
    const normalize = (v: number) => {
      if (!isFinite(v) || isNaN(v)) return 0;
      if (v < 0) v = 0;
      if (v > 100) v = 100;
      return Number(v.toFixed(1));
    };

    const newValues = [
      normalize(incomeGrowth >= 0 ? incomeGrowth : Math.abs(incomeGrowth)), // gunakan absolute growth untuk radar visual
      normalize(spendingGrowth),
      normalize(healthScore),
      normalize(budgetDiscipline),
      normalize(cashFlowStability),
      normalize(expenseDiversity),
    ];

    setValues(newValues);
  }, [transactions, loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Insight</Text>
      <View style={styles.chartContainer}> 
      {/* RadarChart expects numeric array for data. */}
      <RadarChart
      data={values}            // <-- number[]
      maxValue={100}
      chartSize={200}
    //  strokeWidth={1}
      //fontSize={11}
      // try `labels` first:
      labels={labels}
      //labelsConfig={{ fontSize: 11, fontWeight: "600" }}
      // if your version expects a different prop name, rename to the one required by your version:
      // radarLabels={labels}
     // backgroundColor={COLOR.grey}
      //areaColor="rgba(255,255,255,0.18)"
      //showValuesAsLabels={true} // optional, depending on library version
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
    fontSize: 24,
    fontWeight: "700",
    color: COLOR.white,
    marginBottom: 2,
  },
  chartContainer: {
    alignItems: "center",
   // justifyContent: "center",
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
