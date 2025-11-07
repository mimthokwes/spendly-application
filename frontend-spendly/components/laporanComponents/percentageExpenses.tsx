import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "@/contexts/transactionsContext";
import { PieChart } from "react-native-gifted-charts";

export default function TestChart() {
  const { transactions, loading } = useTransactions();

  const [chartData, setChartData] = useState<any[]>([]);
  const [totalSpending, setTotalSpending] = useState<number>(0);

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
      // Ambil hanya spending
      const spendings = transactions.filter((t: any) => t.type === "spending");

      // Kelompokkan nominal berdasarkan kategori
      const categoryTotals: Record<string, number> = {};
      spendings.forEach((t: any) => {
        const cat = t.category || "Others";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.nominal;
      });

      const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
      setTotalSpending(total);

      // Format untuk chart
      const formattedData = Object.keys(categoryTotals).map((category) => ({
        value: categoryTotals[category],
        label: category,
        color: categoryColors[category] || COLOR.grey,
      }));

      setChartData(formattedData);
    } else {
      setChartData([]);
      setTotalSpending(0);
    }
  }, [transactions, loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Percentage of Expenses</Text>
      <View>
      {chartData.length > 0 ? (
        <View style={styles.content}>
          {/* Chart di kiri */}
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

          {/* List kategori di kanan */}
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
        <Text style={{ color: COLOR.grey }}>No data available</Text>
      )}
      </View>
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
