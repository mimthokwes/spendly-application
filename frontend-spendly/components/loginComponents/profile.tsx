import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import {COLOR} from '../../constants/colors'
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileProps {
  username: string;
}

export default function Profile({ username }: ProfileProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={'flutter-dash'} size={120} color={COLOR.white} style={styles.image}/>
      <Text style={styles.text}>Walcome {username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
   // borderRadius: 60,
  },
  text: {
    marginTop: 12,
    fontSize: 28,
    color: COLOR.white,
    fontWeight: 'bold',
  },
});
