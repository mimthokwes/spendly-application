import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.primary
  },
  text: {
    color: COLOR.white
  }
})

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini halaman Dashboard utama</Text>
    </View>
  );
}

