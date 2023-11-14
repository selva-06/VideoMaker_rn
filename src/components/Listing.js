/* eslint-disable prettier/prettier */
// // Listing.js
// /* eslint-disable prettier/prettier */
// // Listing.js
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchListData } from '../store/actions/ListingActions';
// import { Provider as PaperProvider, Menu } from 'react-native-paper';
// import DocumentPicker from 'react-native-document-picker';
// import { launchCamera } from 'react-native-image-picker';
// import axios from 'axios';
// const Listing = () => {
//   const dispatch = useDispatch();
//   const data = useSelector(state => state.list.listData);

//   useEffect(() => {
//     dispatch(fetchListData()); // Dispatch action to fetch list data
//   }, [dispatch]);

//   const imageSize = (windowWidth - 50) / 2;
//   const [menuVisible, setMenuVisible] = useState(false);

//   const openMenu = () => setMenuVisible(true);

//   const closeMenu = () => setMenuVisible(false);

//   const handleVideoUpload = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.video],
//       });
  
//       console.log(result.uri, result.type, result.name, result.size);
  
//       const formData = new FormData();
//       formData.append('file', {
//         uri: result.uri,
//         type: result.type,
//         name: result.name,
//       });
  
//       const url = 'https://api.escuelajs.co/api/v1/files/upload';
//       console.log('Sending request to:', url);
  
//       const response = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       if (response.status === 201) {
//         console.log('Video uploaded successfully!');
//         console.log('Response data:', response.data);
//       } else {
//         console.error('Error uploading video:', response.status);
//         console.log('Response data:', response.data);
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         console.error('Error:', err);
//       }
//     }
//   };
  


//   const startRecordingVideo = async () => {
//     const options = {
//       mediaType: 'video',
//       videoQuality: 'high',
//     };
  
//     try {
//       const response = await launchCamera(options);
  
//       if (response.didCancel) {
//         console.log('User cancelled video recording');
//       } else if (response.error) {
//         console.log('Error recording video:', response.error);
//       } else if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri;
//         const type = response.assets[0].type;
//         const fname = response.assets[0].fileName;
//         console.log('Video recorded:', uri);
//         console.log(type);
//         console.log(fname);
  
//         const formData = new FormData();
//         formData.append('file', {
//           uri: uri,
//           type: type,
//           name: fname,
//         });
  
//         const url = 'https://api.escuelajs.co/api/v1/files/upload';
//         console.log('Sending request to:', url);
  
//         let retryCount = 3; // Number of retry attempts
//         while (retryCount > 0) {
//           try {
//             const uploadResponse = await axios.post(url, formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             });
  
//             if (uploadResponse.status === 201) {
//               console.log('Video uploaded successfully!');
//               console.log('Response data:', uploadResponse.data);
//               break; // Break the loop if successful
//             }
//           } catch (error) {
//             console.error('Error uploading video:', error);
//             if (error.response && error.response.status === 503) {
//               console.log('Server temporarily unavailable, retrying...');
//               retryCount--;
//               await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying
//             } else {
//               break; // Break the loop for non-503 errors
//             }
//           }
//         }
//         if (retryCount === 0) {
//           console.error('Failed to upload after multiple attempts');
//         }
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };
  
//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         <Menu
//           visible={menuVisible}
//           onDismiss={closeMenu}
//           anchor={
//             <TouchableOpacity onPress={openMenu} style={styles.menuTO}>
//               <Image
//                 source={require('../assets/images/attach.png')}
//                 style={styles.menuAnchor}
//               />
//             </TouchableOpacity>
//           }
//           style={styles.menuItems}>
//           <Menu.Item onPress={handleVideoUpload} title="Attach Files from Device" />
//           <Menu.Item onPress={startRecordingVideo} title="Capture Video" />
//         </Menu>
//         <FlatList
//           data={data}
//           numColumns={2}
//           renderItem={({ item }) => (
//             <Image
//               source={item.source}
//               style={[styles.image, { width: imageSize }]}
//               resizeMode="cover"
//             />
//           )}
//           keyExtractor={item => item.id.toString()}
//         />
//       </View>
//     </PaperProvider>
//   );
// };

// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     zIndex: 0,
//   },
//   image: {
//     aspectRatio: 1,
//     marginBottom: 10,
//     marginHorizontal: 10,
//   },
//   menuTO: { marginLeft: 10, marginBottom: 10 },
//   menuAnchor: { width: windowWidth * 0.08, height: windowWidth * 0.09 },
//   menuItems: { marginTop: 30 },
// });

// export default Listing;

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
import {Provider as PaperProvider, Menu} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import {uploadVideoRequest} from '../store/actions/UploadActions';
import { fetchListData } from '../store/actions/ListingActions';

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData); // Updated reducer reference

  useEffect(() => {
    dispatch(fetchListData());
  }, [dispatch]);

  const imageSize = (windowWidth - 50) / 2;
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });

      console.log(result.uri, result.type, result.name, result.size);

      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: result.type,
        name: result.name,
      });

      dispatch(uploadVideoRequest(formData)); // Updated action reference
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error:', err);
      }
    }
  };

  const startRecordingVideo = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'high',
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled video recording');
      } else if (response.error) {
        console.log('Error recording video:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const fname = response.assets[0].fileName;
        console.log('Video recorded:', uri);
        console.log(type);
        console.log(fname);
        const form1 = new FormData();
        form1.append('file', {
          uri: uri,
          type: type,
          name: fname,
        });
        dispatch(uploadVideoRequest(form1)); // Updated action reference
      }
    });
  };


  return (
    <PaperProvider>
      <View style={styles.container}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menuTO}>
              <Image
                source={require('../assets/images/attach.png')}
                style={styles.menuAnchor}
              />
            </TouchableOpacity>
          }
          style={styles.menuItems}>
          <Menu.Item
            onPress={handleVideoUpload}
            title="Attach Files from Device"
          />
          <Menu.Item onPress={startRecordingVideo} title="Capture Video" />
        </Menu>
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
    </PaperProvider>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    zIndex: 0,
  },
  image: {
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  menuTO: {marginLeft: 10, marginBottom: 10},
  menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
  menuItems: {marginTop: 30},
});

export default Listing;
