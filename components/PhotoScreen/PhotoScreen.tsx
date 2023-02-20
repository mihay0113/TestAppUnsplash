import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: photo.urls.full }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default PhotoScreen;
