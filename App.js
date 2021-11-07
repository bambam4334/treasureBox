import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity, Image, Linking} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={{width: 250, height:'25%', marginTop:50}} source={require("./assets/logo.png")}></Image>
      <Text style={{fontWeight:'bold', fontSize: 30, marginTop:30, marginBottom:20}} >Welcome!</Text>
     
      <View>
      <TextInput  style={styles.Email} keyboardType='email-address' placeholder='xxx@it.kmitl.ac.th' autoCapitalize='none' autoCorrect={false}/>
      <TextInput  style={styles.Email} keyboardType='default' placeholder='Password' autoCapitalize='none' autoCorrect={false} secureTextEntry={true} />
      </View>

      <View style={styles.login} >
  
        <TouchableOpacity style={{width:160, height:60, backgroundColor:'#d9001b', borderRadius:5, margin:10}} >
        <Text style={{fontSize:22, color:'#fff', textAlign:'center', paddingTop:15, fontWeight:'bold'}} >Sign In</Text>
      </TouchableOpacity>
  
        <TouchableOpacity style={{width:110, height:60, backgroundColor:'#000', borderRadius:5, margin:10}} >
        <Text style={{fontSize:16, color:'#fff', textAlign:'center', paddingTop:20, fontWeight:'bold', justifyContent:'center'}} >Sign Up</Text>
      </TouchableOpacity>

      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Email:{
    height: 'auto',
    width: 250,
    padding:10,
    fontSize:22,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin:10
  },
  login:{
    flexDirection:'column',
    marginTop:30,
    alignItems: 'center'
    
  }
});
