import React, {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import SignIn from './../screens/SignIn.js';
import Home from './../screens/Home.js';
import Timer from './../screens/Timer.js';

const AppStack = createStackNavigator();
   
const RootStack = () => { 

   return(
      <NavigationContainer>
         <AppStack.Navigator
            screenOptions={{
               headerStyle:{
                  backgroundColor: 'transparent',
               },
               headerTransparent: true,
               headerTitle:'',
            }}
           initialRouteName="SignIn"
         >
            <AppStack.Screen name="SignIn" component={SignIn}/>
            <AppStack.Screen name="Home" component={Home}/>
            <AppStack.Screen name="Timer" component={Timer}/>

         </AppStack.Navigator>
      </NavigationContainer>
   )
}

export default RootStack;