import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLOR } from "../../constants/colors";
import React, { useState } from "react";
import { Link } from "expo-router";
import SpandukLaporan from "@/components/laporanComponents/spandukLaporan";
import TestChart from "@/components/laporanComponents/percentageExpenses";
import MomBarChartIncome from "@/components/laporanComponents/momBarChartIncome";
import MomBarChartSpending from "@/components/laporanComponents/momBarChartSpending";
import FinancialRadar from "@/components/laporanComponents/radarChart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    //justifyContent: "center",
    backgroundColor: COLOR.primary,
  },
  text: {
    color: COLOR.white,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 120,
  },
});

export default function LaporanScreen() {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() -1);
  const [year, setYear] = useState(date.getFullYear());

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SpandukLaporan
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
        <TestChart month={month} year={year} />
        <MomBarChartIncome month={month} year={year} />
        <MomBarChartSpending month={month} year={year} />
        <FinancialRadar month={month} year={year} />
      </ScrollView>
    </View>
  );
}
