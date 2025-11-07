import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useTransactions } from "@/contexts/transactionsContext";
import { COLOR } from "../../constants/colors";
import { BarChart } from "react-native-gifted-charts";

export default function MomBarChartIncome() {
  const { transactions, loading } = useTransactions();
  const [chartData, setChartData] = useState<any[]>([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      const monthlyData: Record<string, number> = {};
      transactions.forEach((t: any) => {
        const date = new Date(t.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${month}`;
        if (t.type === "income") {
          monthlyData[key] = (monthlyData[key] || 0) + (t.nominal || 0);
        }
      });

      const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
        const [ay, am] = a.split("-").map(Number);
        const [by, bm] = b.split("-").map(Number);
        return ay === by ? am - bm : ay - by;
      });

      // Ambil 5 bulan terakhir
      const lastFiveKeys = sortedKeys.slice(-5);

      const formattedData = lastFiveKeys.map((key) => {
        const [year, monthIndex] = key.split("-").map(Number);
        const monthName = new Date(year, monthIndex).toLocaleString("default", {
          month: "short",
        });
        return {
          value: monthlyData[key],
          label: monthName,
          frontColor: COLOR.green,
        };
      });

      setChartData(formattedData);
    }
  }, [transactions, loading]);

  // Hitung lebar chart agar tetap center & stabil
  const totalBars = chartData.length;
  const barWidth = 18;
  const spacing = 35;
  const totalChartWidth = totalBars * (barWidth + spacing);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Income Grow Rate (Last 5 Months)</Text>

      {chartData.length > 0 ? (
        <View
          style={{
            width: screenWidth * 0.9,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <BarChart
            data={chartData}
            width={Math.max(screenWidth * 0.9, totalChartWidth)}
            barWidth={barWidth}
            spacing={spacing}
            barBorderRadius={4}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            noOfSections={4}
            xAxisLabelTextStyle={{ color: COLOR.white }}
            yAxisTextStyle={{ color: COLOR.white }}
            barMarginBottom={5}
            isAnimated
            // showValuesAsTopLabel
            //topLabelTextStyle={{ color: COLOR.white, fontSize: 10 }}
            initialSpacing={(screenWidth * 0.9 - totalChartWidth) / 2} // <--- ini yang bikin chart tetap center
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Belum ada data income...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    minHeight: 280,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: COLOR.secondary,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.white,
    textAlign: "center",
    marginRight: 20,
  },
  loadingText: {
    color: COLOR.grey,
    marginTop: 15,
  },
});
