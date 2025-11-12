import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useTransactions } from "@/contexts/transactionsContext";
import { COLOR } from "../../constants/colors";
import { BarChart } from "react-native-gifted-charts";

type Props = {
  month: number; // 0–11
  year: number;
};

export default function MomBarChartIncome({ month , year }: Props) {
  const { transactions, loading } = useTransactions();
  const [chartData, setChartData] = useState<any[]>([]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      const monthlyData: Record<string, number> = {};

      // Kelompokkan nominal berdasarkan bulan-tahun
      transactions.forEach((t: any) => {
        const date = new Date(t.date);
        const y = date.getFullYear();
        const m = date.getMonth();
        const key = `${y}-${m}`;
        if (t.type === "income") {
          monthlyData[key] = (monthlyData[key] || 0) + (t.nominal || 0);
        }
      });

      // Buat daftar 5 bulan terakhir termasuk bulan yang dipilih
      const targetDate = new Date(year, month);
      const lastFiveKeys: string[] = [];
      for (let i = 4; i >= 0; i--) {
        const d = new Date(targetDate.getFullYear(), targetDate.getMonth() - i);
        const k = `${d.getFullYear()}-${d.getMonth()}`;
        lastFiveKeys.push(k);
      }

      // Format ke bentuk chart
      const formattedData = lastFiveKeys.map((key) => {
        const [y, m] = key.split("-").map(Number);
        const monthName = new Date(y, m).toLocaleString("default", {
          month: "short",
        });
        return {
          value: monthlyData[key] || 0,
          label: monthName,
          frontColor: COLOR.green,
        };
      });

      setChartData(formattedData);
    }
  }, [transactions, loading, month, year]);

  // Hitung ukuran chart agar tetap center
  const totalBars = chartData.length;
  const barWidth = 18;
  const spacing = 35;
  const totalChartWidth = totalBars * (barWidth + spacing);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Income Growth (Last 5 Months up to{" "}
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        )
      </Text>

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
            initialSpacing={(screenWidth * 0.9 - totalChartWidth) / 2}
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
