// Listing.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Provider as PaperProvider,
  Menu,
  ProgressBar,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import {uploadVideoRequest} from '../store/actions/UploadActions';
import {fetchListData} from '../store/actions/ListingActions';
import UploadModal from './ProgressLoader';
import MenuComponent from './MenuComponent';
import {listingstyles} from './ComponentStyles';

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData); // Updated reducer reference
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  console.log('hi', uploadProgress, uploading);

  useEffect(() => {
    dispatch(fetchListData());
  }, [dispatch]);

  const imageSize = (windowWidth - 50) / 2;

  return (
    <View style={styles.container}>
      <UploadModal />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <Image
            source={item.source}
            style={[styles.image, {width: imageSize}]}
            resizeMode="cover"
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = listingstyles;
export default Listing;
