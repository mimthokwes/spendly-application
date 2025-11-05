import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";
import TotalAssets from "../../components/dashboardComponents/totalAssets";
import TransactionsInfo from "@/components/dashboardComponents/transactionsInfo";
import InsightUser from "@/components/dashboardComponents/insightUser";
import StatusKeuangan from "@/components/dashboardComponents/cashFlow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default function DashboardScreen() {
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} 
      >
        <TotalAssets onChangePercentage={setPercentageChange} />
        <TransactionsInfo />
        <InsightUser percentageChange={percentageChange} />
        <StatusKeuangan />
      </ScrollView>
    </View>
  );
}
