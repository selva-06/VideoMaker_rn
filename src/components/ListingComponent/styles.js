/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const listingstyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    zIndex: 0,
  },
  image: {
    aspectRatio: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  menuTO: {marginLeft: 10, marginBottom: 10},
  menuAnchor: {width: windowWidth * 0.08, height: windowWidth * 0.09},
  menuItems: {marginTop: 30},

  noInternet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:120,

  },
  imageStyle:{
    height:windowHeight*0.15,
    width:windowWidth*0.35,
    alignContent:"center",
    marginBottom:15,
  },
  whops:{
    fontFamily:"Poppins-Bold",
    fontSize:20,
    color:"black",
  },
  whopsDescription:{
    fontFamily:"Poppins-Regular",
    fontSize:15,
  },
  pullDown:{
    fontFamily:"Poppins-Bold",
    fontSize:13,
    color:"white",
    
  },
  pullDownContainer:{
    backgroundColor:"black",
    padding:3,
    paddingLeft:13,
    paddingRight:13,
    borderRadius:5,
    marginTop:20,
  },
});
