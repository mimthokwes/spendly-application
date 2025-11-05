import { View, Text, StyleSheet } from 'react-native'
import { COLOR } from '@/constants/colors';


export default function InputCatatanKeuangan() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Input Catatan Keuangan</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 25,
        width: "95%",
        height: "60%",
        backgroundColor: COLOR.secondary,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});