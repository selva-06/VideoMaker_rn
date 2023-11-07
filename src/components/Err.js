/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, {useState} from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {View, Image, TouchableOpacity} from 'react-native';

// const Err = ({navigation}) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const items = [
//     {label: 'Upload', value: 'upload'},
//     {label: 'Attach', value: 'attach'},
//   ];

//   const handleOptionSelect = item => {
//     if (item.value === 'upload') {
//       console.log('Upload selected');
//       // Implement upload logic here
//     } else if (item.value === 'attach') {
//       console.log('Attach selected');
//       // Implement attach logic here
//     }
//     setValue(item.value);
//     setOpen(false);
//   };

//   return (
//     <View>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         showArrowIcon={false} // Hide the default arrow
//         containerStyle={{marginTop: 10}}
//         style={{borderColor: '#ccc'}}
//         dropDownContainerStyle={{borderColor: '#ccc'}}
//         labelStyle={{color: 'orange'}}
//         onChangeItem={handleOptionSelect}
//         renderHeader={() => (
//           <TouchableOpacity onPress={() => setOpen(!open)}>
//             <Image
//               source={require('../assets/images/attach.png')}
//               style={{width: 50, height: 50}}
//             />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default Err;

import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Header = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('upload');

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../assets/images/attach.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            if (itemValue === 'upload') {
              console.log('Upload selected');
              navigation.navigate('Login');
            } else if (itemValue === 'attach') {
              console.log('Attach selected');
            }
          }}
          itemStyle={{ color: 'black', fontSize: 20 }}
        >
          <Picker.Item label="Upload" value="upload" />
          <Picker.Item label="Attach" value="attach" />
        </Picker>
      </View>
    </View>
  );
}

export default Header;
