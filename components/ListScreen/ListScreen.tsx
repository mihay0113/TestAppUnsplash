import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { photosSlice, fetchPhotos, PhotosState } from '../../redux/PhotosSlice';

const ListScreen = () => {
  const dispatch = useDispatch();
  const { photos, page } = useSelector<RootState, PhotosState>((state) => state.photos);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(photosSlice.actions.incrementPage());
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
