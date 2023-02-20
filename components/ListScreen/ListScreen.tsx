import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

const KEY = '896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043';
const page = '1';

const ListScreen = () => {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos?order_by=popular&page=${page}&client_id=${KEY}`);
        setPhotos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPhotos();
  }, []);

  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => navigation.navigate('Photo', { photo: item })}
    >
      <FastImage
        style={styles.photo}
        source={{ uri: item.urls.small }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.photoInfo}>
        <Text style={styles.title}>{item.user.name}</Text>
        <Text style={styles.subtitle}>{item.alt_description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        numColumns={2}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  photoContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    flex: 1,
    aspectRatio: 1,
  },
  photoInfo: {
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
});

export default ListScreen;
