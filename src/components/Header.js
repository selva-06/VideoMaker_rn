/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // Header.js
// import React, {useState} from 'react';
// import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const styles = headerstyles;

//   return (
//     <View>
//     <View style={styles.header}>
//       <TouchableOpacity onPress={toggleDropdown}>
//         <Image source={require('../assets/images/attach.png')} style={styles.attach} />
//       </TouchableOpacity>
//       <Text style={styles.headText}>Home Screen</Text>
//       </View>
//       {showDropdown && (
//         <View
//           style={styles.drop}>
//           <TouchableOpacity onPress={() => console.log('Upload clicked')}>
//             <Text>Upload Video Files From Device</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => console.log('Record clicked')}>
//             <Text>Record</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Header;
// const { width, height } = Dimensions.get('window');

// const headerstyles =
//  {
//     container: {
//         flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         padding: 5,
//         backgroundColor: 'skyblue',
//       },
//       header: {
//         flexDirection:"row"
//       },
//       headText: {
//         color:'black',
//         fontSize: 16,
//         fontWeight: '300',
//       },
//       attach: { width: 0.0600 * width, height: 0.0250 * height, marginTop:3, marginHorizontal:5 },

//       logout: {
//         color: 'green',
//       },
//       drop: {
//         position: 'absolute',
//         top: 50,
//         right: 10,
//         backgroundColor: 'black',
//         marginHorizontal: 10,
//         width: Dimensions.get('window').width / 1.7,
//       },
//     };

import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Icon, MD3Colors } from 'react-native-paper';
const Header = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const items = [
    { label: 'Upload', value: 'upload' },
    { label: 'Record', value: 'record' },
  ];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const handleVideoUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      console.log(
        result.uri,
        result.type,
        result.name,
        result.size
      );
      // Implement logic to handle the selected video
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Image
          source={require('../assets/images/attach.png')}
          style={{ width: windowWidth * 0.0800, height: windowWidth * 0.0900 }}
        />
      </TouchableOpacity>
      {open && (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          dropDownContainerStyle={{ width: windowWidth * 0.4, borderRadius:10 }}
          style={{
            position: 'absolute',
            top: windowHeight * 0.01,      //0.05553
            zIndex: 1,
            width: windowWidth * 0.4,
          }}
          placeholder=""
          onSelectItem={(item) => {
            if (item.value === 'upload') {
              console.log('Upload selected');
              handleVideoUpload();
            } else if (item.value === 'record') {
              console.log('Record selected');
              navigation.navigate('Login');
            }
          }}
        />
      )}
    </View>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const Header = ({ navigation }) => {
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [open, setOpen] = useState(false);

//   return (
//     <View>
//           <Picker
//         selectedValue={selectedValue}
//         onValueChange={(itemValue, itemIndex) => {
//           setSelectedValue(itemValue);
//           if (itemValue === 'upload') {
//             console.log('Upload selected');
//             navigation.navigate('Login');
//           } else if (itemValue === 'attach') {
//             console.log('Attach selected');
//           }
//         }}
//         style={{ width: 50, position: 'absolute', top: 10, left: 0, zIndex: 1 }}

//       >
//         <Picker.Item label="Upload" value="upload" />
//         <Picker.Item label="Attach" value="attach" />
//       </Picker>
//       <TouchableOpacity onPress={() => setOpen(!open)}>
//         <Image
//           source={require('../assets/images/attach.png')}
//           style={{ width: 50, height: 50 }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }

// export default Header;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Menu, { MenuItem, MenuDivider } from 'react-native-popup-menu';

// const MyMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleMenuPress = (action) => {
//     setIsOpen(false);

//     if (action === 'upload') {
//       console.log('Upload selected');
//     } else if (action === 'attach') {
//       console.log('Attach selected');
//     }
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Menu
//         opened={isOpen}
//         onBackdropPress={() => setIsOpen(false)}
//       >
//         <MenuItem onPress={() => handleMenuPress('upload')}>Upload</MenuItem>
//         <MenuDivider />
//         <MenuItem onPress={() => handleMenuPress('attach')}>Attach</MenuItem>
//       </Menu>

//       <TouchableOpacity onPress={() => setIsOpen(true)}>
//         <Text>Show Menu</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// export default MyMenu;
