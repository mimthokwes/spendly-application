import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors';
import TotalAssets from "../../components/dashboardComponents/totalAssets";
import TransactionsInfo from "@/components/dashboardComponents/transactionsInfo";

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

  return (
    <View style={styles.container}>
    <TotalAssets/>
    <TransactionsInfo/>
    </View>
  );
}

