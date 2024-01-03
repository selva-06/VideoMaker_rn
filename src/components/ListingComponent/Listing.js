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
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListData} from '../../store/actions/ListingActions';
import UploadModal from '../ProgressLoaderComponent/ProgressLoader';
import {listingstyles} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
const Listing = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData); // Updated reducer reference
  const uploading = useSelector(state => state.upload.uploading);
  const uploadProgress = useSelector(state => state.upload.uploadProgress);
  const [refreshing, setRefreshing] = useState(false);

  console.log('hi', uploadProgress, uploading);
  useEffect(() => {
    if (!uploading) {
      dispatch(fetchListData());
      alert('dispatch');
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
    console.log(item.threeDFilePath);
    if (item.threeDFilePath.trim() !== '') {
      //threeDFilePath.trim() !== ''
      console.log('exists', item.threeDFilePath);

      navigation.navigate('ModelVideoScreen', {
        videoPath: item.videoPath,
        thumbnailPath: `http://34.234.122.64/${item.thumbnail}`,
        originalName: item.originalName,
        threeDFilePath: `http://34.234.122.64/${item.threeDFilePath}`,
      });
    } else {
      console.log('notexists', item.threeDFilePath);

      navigation.navigate('ModelVideoScreen', {
        videoPath: item.videoPath,
        thumbnailPath: `http://34.234.122.64/${item.thumbnail}`,
        originalName: item.originalName,
        threeDFilePath: ``,
      });
    }
  };

  return (
    <View style={styles.container}>
      <UploadModal />
      {/* {(data && data.length === 0) || data === null ? (
        <View>
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
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={{color: 'black'}}>Refresh Data</Text>
          </TouchableOpacity>
        </View>
      ) : ( */}
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item}) => {
            // Check if item and item.thumbnail exist before logging
            if (item && item.thumbnail) {
              console.log(
                'Thumbnail URI:',
                `http://34.234.122.64/${item.thumbnail}`,
                `http://34.234.122.64/${item.threeDFilePath}`,
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
                  marginTop: 10,
                  borderRadius: 8,
                  elevation: 10,
                  shadowOpacity: 100,
                  shadowColor: 'black',
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

                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '30%',
                  }}>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: 20,
                        fontSize: RFValue(12),
                        fontFamily: 'Poppins-Medium',
                        // fontStyle:'italic',
                        // textAlign: 'left',
                      }}>
                      {item.originalName}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              //               <TouchableOpacity
              //   onPress={() => handleItemPress(item)}
              //   style={{
              //     width: imageSize,
              //     height: imageSize,
              //     margin: 5,
              //     marginBottom: 10,
              //     marginHorizontal: 10,
              //     marginTop: 10,
              //     borderRadius: 8, // Apply border radius to the TouchableOpacity
              //     borderWidth: 1,
              //     overflow: 'hidden', // Clip child components to the border radius
              //     elevation: 10,
              //     shadowColor: 'black',
              //     shadowRadius: 20,
              //     justifyContent: 'center',
              //     // alignItems: 'center', // Center content horizontally

              //   }}
              // >
              //   <ImageBackground
              //     source={{ uri: `http://34.234.122.64/${item.thumbnail}` }}
              //     style={{
              //       flex: 1,
              //       borderRadius: 8,
              //       justifyContent: 'flex-end', // Align the linear gradient to the bottom
              //     }}
              //     resizeMode="cover"
              //     imageStyle={{ borderRadius: 8 }} // Apply border radius to the image
              //   >
              //     <LinearGradient
              //       colors={['transparent', 'rgba(0,0,0,0.7)']} // Gradient colors and opacity
              //       style={{
              //         flex: 1,

              //         justifyContent: 'center',
              //                       alignItems: 'center',
              //                       borderRadius: 8,
              //     }}
              //     >
              // <Text
              //                       style={{
              //                         color: 'white',
              //                         marginTop: 20,
              //                         fontSize: RFValue(12),
              //                         fontFamily: 'Poppins-Medium',
              //                         paddingRight: 30,
              //                         // fontStyle:'italic',
              //                         // textAlign: 'center',
              //                       }}>        {item.originalName}
              //       </Text>
              //     </LinearGradient>
              //   </ImageBackground>
              // </TouchableOpacity>
            );
          }}
          // keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onSwipeDown}
              color={'black'}
            />
          }
          ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'red' }}>
          <Text style={{color: 'black'}}>No data available kindly refresh</Text>
        </View>}
        />
      {/* )} */}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
export default Listing;
