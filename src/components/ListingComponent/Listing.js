// Listing.js
import React, {useEffect} from 'react';
import {View, FlatList, Image, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListData} from '../../store/actions/ListingActions';
import UploadModal from '../ProgressLoaderComponent/ProgressLoader';
import {listingstyles} from './styles';

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
  const styles = listingstyles;

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
export default Listing;
