import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../../redux/actions';

const ListScreen = () => {
  const dispatch = useDispatch();
  const { loading, photos, error, page } = useSelector((state: any) => state.photos);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(fetchPhotos(page));
  };

  const renderPhoto = ({ item }: any) => (
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={photos}
      renderItem={renderPhoto}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      numColumns={2}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
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
