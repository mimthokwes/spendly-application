import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import {COLOR} from '../../constants/colors'

interface ProfileProps {
  imageSource: ImageSourcePropType; // ✅ tipe bawaan React Native untuk gambar
  username: String;
}

export default function Profile({ imageSource, username }: ProfileProps) {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{username}</Text>
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
    borderRadius: 60,
  },
  text: {
    marginTop: 12,
    fontSize: 28,
    color: COLOR.white,
    fontWeight: 'bold',
  },
});
