import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function SignIn({ navigation }) {
       let [fontsLoaded] = useFonts({
         'Transat-Bold': require('./../assets/fonts/transat_bold-webfont.ttf'),
       });
       if (!fontsLoaded) {
         return <AppLoading />;
       } else {

       return (
            <View style={styles.container}>
               <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home')
               }}>
                  <Image style={styles.image} source={require("../assets/images/google-icon.png")}></Image>
                  <Text style={{      
                     color: "#757575",
                     fontSize:12,
                     left:5,
                     }}>SIGN IN WITH GOOGLE</Text>
               </TouchableOpacity>
            </View>
         );
      }

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"white",
    },
    button:{
      //top: 250,
      elevation: 2,
      borderRadius:12,
      width: 200,
      height: 50,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent:"center",
      flexDirection:"row"
    },
    image:{
       width:15,
       height:15,
       right:10
    }
});
