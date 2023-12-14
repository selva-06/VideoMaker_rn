// Listing.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListData} from '../../store/actions/ListingActions';
import UploadModal from '../ProgressLoaderComponent/ProgressLoader';
import {listingstyles} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';

const Listing = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData); // Updated reducer reference
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const [refreshing, setRefreshing] = useState(false);

  console.log('hi', uploadProgress, uploading);

  // useEffect(() => {

  //   dispatch(fetchListData());
  //   alert('hi');
  //   console.log('USEEFFECTFETCHING');
  // }, [dispatch, navigation]);

  useEffect(() => {
    if (!uploading) {
      dispatch(fetchListData());
      // alert('hi');
    }
  }, [dispatch, uploading]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchListData());
    setRefreshing(false);
  };

  const onSwipeDown = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating refreshing time
    handleRefresh();
  };

  const imageSize = (windowWidth - 50) / 2;
  const styles = listingstyles;
  const handleItemPress = item => {
    navigation.navigate('VideoPlayerScreen', {
      videoPath: item.videoPath,
    });
  };

  return (
    // <View style={{flex: 1}}>
    //   <ScrollView
    //     refreshControl={
    //       <RefreshControl
    //         refreshing={refreshing}
    //         onRefresh={onSwipeDown}
    //         colors={['black']} // Change the color of the loader
    //       />
    //     }>
    <View style={styles.container}>
      <UploadModal />
      {/* <RefreshControl
        refreshing={refreshing}
        onRefresh={onSwipeDown}
        color={'black'} // Change the color of the loader
      /> */}

      {/* <FlatList
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
              >
                <Image
                  source={{uri: `http://34.203.231.237/${item.thumbnail}`}} // Prepending the base URL
                  style={{
                    height: imageSize,
                    width: imageSize,
                    borderRadius: 8,
                  }} // Take full width and height inside TouchableOpacity
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            // keyExtractor={item => item.id.toString()}
          /> */}
      {(data && data.length === 0) || data === null ? (
        <Text
          style={{
            color: 'black',
            fontSize: RFValue(20),
            alignSelf: 'center',
            margin: '20%',
            fontFamily: 'EBGaramond-VariableFont_wght',
          }}>
          No data present
        </Text>
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item}) => {
            // Check if item and item.thumbnail exist before logging
            if (item && item.thumbnail) {
              console.log(
                'Thumbnail URI:',
                `http://34.203.231.237/${item.thumbnail}`,
              );
            }
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={{
                  width: imageSize,
                  height: imageSize,
                  margin: 5,
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                <Image
                  source={{
                    uri: `http://34.234.122.64/${item.thumbnail}`,
                  }}
                  style={{
                    height: imageSize,
                    width: imageSize,
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                  onError={error => console.log('Image load error:', error)}
                />
                <Image
                  source={require('../../assets/images/play.png')}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    top: 50,
                    marginLeft: 50,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
          // keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onSwipeDown}
              color={'black'} // Change the color of the loader
            />
          }
        />
      )}

      {/* <TouchableOpacity onPress={handleRefresh}>
        <Text style={{color: 'black'}}>Refresh Data</Text>
      </TouchableOpacity> */}
    </View>
    //   </ScrollView>
    // </View>
  );
};

const windowWidth = Dimensions.get('window').width;
export default Listing;
