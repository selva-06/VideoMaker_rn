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

// import * as React from 'react';
// import { View } from 'react-native';
// import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';

// const Err = () => {
//   const [visible, setVisible] = React.useState(false);

//   const openMenu = () => setVisible(true);

//   const closeMenu = () => setVisible(false);

//   return (
//     <PaperProvider>
//       <View>
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={<Button onPress={openMenu}>Show menu</Button>}>
//           <Menu.Item onPress={() => {}} title="Item 1" />
//           <Menu.Item onPress={() => {}} title="Item 2" />
//           <Divider />
//           <Menu.Item onPress={() => {}} title="Item 3" />
//         </Menu>
//       </View>
//     </PaperProvider>
//   );
// };

// export default Err;

import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';

const Err = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}
          style={{ marginTop: 10, marginRight: 10, height: 50,backgroundColor:'black' }}
          >Show menu</Button>}
          style={{ zIndex: 1,position:'absolute'}}
          >
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default Err;