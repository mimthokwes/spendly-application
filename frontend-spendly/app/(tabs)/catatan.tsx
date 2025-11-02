import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors';


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

export default function CatatanSceen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ini halaman Catatan pengeluaran dan pemasukan</Text>
        </View>
    );
}
