import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "@/contexts/transactionsContext";
import { PieChart } from "react-native-gifted-charts";

type Props = {
  month: number; // 1–12
  year: number;
};

export default function TestChart({ month, year }: Props) {
  const { transactions, loading } = useTransactions();

  const [chartData, setChartData] = useState<any[]>([]);
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  // Daftar kategori tetap
  const categories = [
    "Food & Beverages",
    "Transportation",
    "Shopping",
    "Bills & Utilities",
    "Entertainment / Leisure",
    "Income / Salary",
    "Others",
  ];

  // Warna tiap kategori
  const categoryColors: Record<string, string> = {
    "Food & Beverages": "#FF6B6B",
    Transportation: "#FFD93D",
    Shopping: "#6BCB77",
    "Bills & Utilities": "#4D96FF",
    "Entertainment / Leisure": "#C77DFF",
    "Income / Salary": "#00B894",
    Others: "#B2BEC3",
  };

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      // Filter transaksi sesuai bulan & tahun yang dipilih user
      const filteredTx = transactions.filter((t: any) => {
        const d = new Date(t.date);
        return d.getMonth() + 1 === month + 1 && d.getFullYear() === year;
      });

      // Pisahkan spending dan income
      const spendings = filteredTx.filter((t: any) => t.type === "spending");
      const incomes = filteredTx.filter((t: any) => t.type === "income");

      // Hitung total spending & income
      const totalSp = spendings.reduce((a: number, b: any) => a + b.nominal, 0);
      const totalIn = incomes.reduce((a: number, b: any) => a + b.nominal, 0);

      setTotalSpending(totalSp);
      setTotalIncome(totalIn);

      // Kelompokkan nominal berdasarkan kategori
      const categoryTotals: Record<string, number> = {};
      spendings.forEach((t: any) => {
        const cat = t.category || "Others";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.nominal;
      });

      // Format untuk chart
      const formattedData = Object.keys(categoryTotals).map((category) => ({
        value: categoryTotals[category],
        label: category,
        color: categoryColors[category] || COLOR.grey,
      }));

      setChartData(formattedData);
    } else {
      // Jika belum ada data
      setChartData([]);
      setTotalSpending(0);
      setTotalIncome(0);
    }
  }, [transactions, loading, month, year]);

  // Hitung Spending Ratio (%)
  const spendingRatio =
    totalIncome > 0 ? ((totalSpending / totalIncome) * 100).toFixed(1) : "0.0";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Percentage of Expenses</Text>
      {chartData.length > 0 ? (
        <View style={styles.content}>
          {/* Chart */}
          <View style={styles.chartWrapper}>
            <PieChart
              data={chartData}
              radius={80}
              donut
              innerRadius={60}
              innerCircleColor={COLOR.secondary}
              showText
              textColor={COLOR.white}
              focusOnPress
            />
            {/* Text di tengah */}
            <View style={styles.centerTextContainer}>
              <Text style={styles.centerValue}>{spendingRatio}%</Text>
              <Text style={styles.centerLabel}>Spending</Text>
            </View>
          </View>

          {/* List kategori */}
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => {
              const percentage =
                totalSpending > 0
                  ? ((item.value / totalSpending) * 100).toFixed(1)
                  : "0.0";
              return (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: item.color || COLOR.grey },
                    ]}
                  />
                  <Text style={styles.legendText}>
                    {item.label.length > 18
                      ? item.label.slice(0, 18) + "..."
                      : item.label}
                  </Text>
                  <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <Text style={{ color: COLOR.grey, textAlign: "center" }}>
          No data found for {month}/{year}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    minHeight: 300,
    backgroundColor: COLOR.secondary,
    marginTop: 10,
    borderRadius: 25,
    padding: 10,
  },
  title: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  chartWrapper: {
    position: "relative",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  centerTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  centerValue: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  centerLabel: {
    color: COLOR.grey,
    fontSize: 10,
  },
  legendContainer: {
    flex: 1,
    marginLeft: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    color: COLOR.white,
    fontSize: 8,
    flex: 1,
  },
  percentageText: {
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: 8,
    marginRight: 8,
  },
});
