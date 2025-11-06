import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {COLOR} from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';


export default function SpandukLaporan() {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.text}>Financial Analysis</Text>
            <Text style={styles.textDate}>{month} {year}</Text>
            </View>
            <MaterialIcons name="insert-chart" size={38} color={COLOR.white}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR.secondary,
        borderRadius: 25,
        padding: 40,      
    },
      text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLOR.white
      },
      textDate: {
        fontSize: 16,
        color: COLOR.grey
      }
})