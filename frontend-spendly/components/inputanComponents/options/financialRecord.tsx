import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLOR } from '@/constants/colors';

export default function FinancialRecord() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Financial Record</Text>
        </View>
    );
}

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