import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default function CatatanSceen() {
    return (
        <View style={styles.container}>
            <Text>Ini halaman Catatan pengeluaran dan pemasukan</Text>
        </View>
    );
}
