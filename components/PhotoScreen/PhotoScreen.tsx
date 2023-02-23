import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const PhotoScreen = ({ route }: any) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: photo.urls.full }} />
      <View style={styles.photoInfo}>
        <Text style={styles.title}>{photo.user.name}</Text>
        {photo.alt_description && <Text style={styles.description}>{photo.alt_description}</Text>}
      </View>
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
    height: '80%',
    resizeMode: 'contain',
  },
  photoInfo: {
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default PhotoScreen;
