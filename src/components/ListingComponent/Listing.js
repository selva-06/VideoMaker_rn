// Listing.js
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListData} from '../../store/actions/ListingActions';
import UploadModal from '../ProgressLoaderComponent/ProgressLoader';
import {listingstyles} from './styles';

const Listing = ({navigation}) => {
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
  const handleItemPress = item => {
    navigation.navigate('Profile', {item}); // Navigate to Details screen with item data
  };

  return (
    <View style={styles.container}>
      <UploadModal />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={{
              width: imageSize,
              height: imageSize,
              margin: 5,
              marginBottom: 10,
              marginHorizontal: 10,
            }} // Set width, height, and margin
            // Set width, height, and margin
          >
            <Image
              source={item.source}
              style={{
                height: imageSize,
                width: imageSize,
                borderRadius: 8,
              }} // Take full width and height inside TouchableOpacity
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
export default Listing;
