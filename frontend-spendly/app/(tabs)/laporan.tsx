import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors'
import { Link } from "expo-router";
import SpandukLaporan from "@/components/laporanComponents/spandukLaporan";
import DonutChart from "@/components/laporanComponents/donatChart";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        //justifyContent: "center",
        backgroundColor: COLOR.primary
    },
    text: {
        color: COLOR.white
    }
})

export default function LaporanScreen() {
    return (
        <View style={styles.container}>
            <SpandukLaporan/>
            <DonutChart/>
        </View>
    );
}
