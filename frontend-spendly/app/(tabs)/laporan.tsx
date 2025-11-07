import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLOR } from "../../constants/colors";
import { Link } from "expo-router";
import SpandukLaporan from "@/components/laporanComponents/spandukLaporan";
import TestChart from "@/components/laporanComponents/percentageExpenses";
import MomBarChartIncome from "@/components/laporanComponents/momBarChartIncome";
import MomBarChartSpending from "@/components/laporanComponents/momBarChartSpending";

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
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SpandukLaporan />
        <TestChart />
        <MomBarChartIncome/>
        <MomBarChartSpending/>
      </ScrollView>
    </View>
  );
}
