/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // Listing.js
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   PermissionsAndroid,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchListData} from '../store/actions/ListingActions';
// import {Provider as PaperProvider, Menu, Button} from 'react-native-paper';
// import DocumentPicker from 'react-native-document-picker';

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
//   const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       ]);

//       if (
//         granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
//         granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         // Both permissions granted, proceed with document picking
//         const result = await DocumentPicker.pick({
//           type: [DocumentPicker.types.video],
//         });
//         console.log(result.uri, result.type, result.name, result.size);
//       } else {
//         // Permissions not granted
//         console.log('Permissions not granted');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const handleVideoUpload = async () => {
//     const hasPermission = await requestPermission();

//     if (hasPermission) {
//       try {
//         const result = await DocumentPicker.pick({
//           type: [DocumentPicker.types.video],
//         });
//         console.log(result.uri, result.type, result.name, result.size);
//         // Implement logic to handle the selected video
//       } catch (err) {
//         if (DocumentPicker.isCancel(err)) {
//           // User cancelled the picker
//           console.log(err);
//         } else {
//           throw err;
//         }
//       }
//     } else {
//       console.log('Permissions not granted');
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
//           <Menu.Item onPress={() => {
//                                 // requestPermission(); // Request permissions first
//                                 handleVideoUpload(); // Then, proceed with picking the document
//                               }}  title="Attach Files from Device" />
//           <Menu.Item onPress={() => {}} title="Capture Video" /> 
//         </Menu>
//         <FlatList
//           data={data}
//           numColumns={2}
//           renderItem={({item}) => (
//             <Image
//               source={item.source}
//               style={[styles.image, {width: imageSize}]}
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
//   menuTO:{marginLeft: 10, marginBottom:10},
//   menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
//   menuItems: {marginTop: 30},
// });

// export default Listing;

/* eslint-disable prettier/prettier */
// Listing.js
/* eslint-disable prettier/prettier */
// Listing.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListData } from '../store/actions/ListingActions';
import { Provider as PaperProvider, Menu } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';

const Listing = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.list.listData);

  useEffect(() => {
    dispatch(fetchListData()); // Dispatch action to fetch list data
  }, [dispatch]);
  const [videoUri, setVideoUri] = useState(null);

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
        setVideoUri(result.uri);
        // Implement logic to handle the selected video
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker
          console.log(err);
        } else {
          throw err;
        }
      }

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
          <Menu.Item onPress={handleVideoUpload} title="Attach Files from Device" />
          <Menu.Item onPress={() => {}} title="Capture Video" />
        </Menu>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <Image
              source={item.source}
              style={[styles.image, { width: imageSize }]}
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
  menuTO: { marginLeft: 10, marginBottom: 10 },
  menuAnchor: { width: windowWidth * 0.08, height: windowWidth * 0.09 },
  menuItems: { marginTop: 30 },
});

export default Listing;
