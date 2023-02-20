import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const PhotoScreen = ({ route }: any) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: photo.urls.full }} />
      <Text style={styles.title}>{photo.user.name}</Text>
      {photo.description && <Text style={styles.description}>{photo.description}</Text>}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
  },
});

export default PhotoScreen;
