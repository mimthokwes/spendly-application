import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default function LaporanScreen() {
    return (
        <View style={styles.container}>
            <Text>Ini halaman laporan keuangan</Text>
        </View>
    );
}
