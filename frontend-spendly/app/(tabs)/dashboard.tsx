import React, { useState } from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors';
import TotalAssets from "../../components/dashboardComponents/totalAssets";
import TransactionsInfo from "@/components/dashboardComponents/transactionsInfo";
import InsightUser from "@/components/dashboardComponents/insightUser";
import StatusKeuangan from "@/components/dashboardComponents/statusKeuangan";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
   // justifyContent: "center",
    backgroundColor: COLOR.primary
  },
  text: {
    color: COLOR.white
  }
})

export default function DashboardScreen() {
    const [percentageChange, setPercentageChange] = useState<number | null>(null);

  return (
    <View style={styles.container}>
    <TotalAssets onChangePercentage={setPercentageChange}/>
    <TransactionsInfo/>
    <InsightUser percentageChange={percentageChange}/>
    <StatusKeuangan/>
    </View>
  );
}

