import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useTransactions } from "@/contexts/transactionsContext";
import { COLOR } from "@/constants/colors";

const RADIUS = 80; // ukuran lingkaran
const STROKE_WIDTH = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function SpendingPieChart() {
  const { transactions } = useTransactions();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Filter hanya spending
    const spendings = transactions.filter((t: any) => t.type === "spending");

    // Total spending
    const total = spendings.reduce((sum: number, t: any) => sum + t.nominal, 0);

    // Group by category
    const grouped: Record<string, number> = {};
    spendings.forEach((t: any) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.nominal;
    });

    // Convert ke array data + persentase
    const data = Object.keys(grouped).map((category) => ({
      category,
      value: grouped[category],
      percentage: ((grouped[category] / total) * 100).toFixed(1),
    }));

    setChartData(data);
  }, [transactions]);

  // Warna acak tiap kategori
  const colors = [
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#C77DFF",
    "#FF8C42",
    "#00C9A7",
    "#FF7B89",
  ];

  let offset = 0;
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Perentage of Expenses</Text>
        <View>
    <View style={styles.wrapper}>
      <Svg width="100%" height="200" viewBox="0 0 100 200">
        <G rotation="-90" origin="100,100">
          {chartData.map((item, index) => {
            const strokeDasharray = `${(CIRCUMFERENCE * item.percentage) / 100} ${CIRCUMFERENCE}`;
            const circle = (
              <Circle
                key={index}
                cx="100"
                cy="100"
                r={RADIUS}
                stroke={colors[index % colors.length]}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
              />
            );
            offset -= (CIRCUMFERENCE * Number(item.percentage)) / 100;
            return circle;
          })}
        </G>
      </Svg>

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: colors[index % colors.length] },
              ]}
            />
            <Text style={styles.legendText}>
              {item.category}: {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.secondary,
    marginTop: 10,
    borderRadius: 25,
    paddingVertical: 10,
  },
  title: {
    color: COLOR.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 110,
  },
  legendContainer: {
    marginTop: 1,
    alignItems: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  colorBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    color: COLOR.white,
    fontSize: 8,
  },
});
