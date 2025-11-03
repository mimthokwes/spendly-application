import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors';
import TotalAssets from "../../components/dashboardComponents/totalAssets";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    </View>
  );
}

