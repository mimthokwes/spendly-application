import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors'
import { Link } from "expo-router";

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

export default function LaporanScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ini halaman laporan keuangan</Text>
            <Link href="/" style={styles.text}> to apps</Link>
            
        </View>
    );
}
