import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, TouchableOpacity, StyleSheet, Picker, Image} from 'react-native';
import * as SMS from 'expo-sms';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';



Notifications.setNotificationHandler({
   handleNotification: async () => ({
     shouldShowAlert: true,
     shouldPlaySound: false,
     shouldSetBadge: false,
   }),
 });
 export default function App({ navigation }) {


   const [selectedValue_Game, setSelectedValue_Game] = useState("");
   const [selectedValue_Squad, setSelectedValue_Squad] = useState("");
   
   const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();
 
   useEffect(() => {
     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
 
     // This listener is fired whenever a notification is received while the app is foregrounded
     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
       setNotification(notification);
     });
 
     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
       console.log(response);
     });
 
     return () => {
       Notifications.removeNotificationSubscription(notificationListener.current);
       Notifications.removeNotificationSubscription(responseListener.current);
     };
   }, []);   


   let [fontsLoaded] = useFonts({
        'Transat-Black': require('./../assets/fonts/transat_black-webfont.ttf'),
        'Transat-Bold': require('./../assets/fonts/transat_bold-webfont.ttf'),
        'Transat-Medium': require('./../assets/fonts/transat_medium-webfont.ttf'),
        'Transat-Standard': require('./../assets/fonts/transat_standard-webfont.ttf'),
        'Transat-Light': require('./../assets/fonts/transat_light-webfont.ttf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Picker
                  selectedValue={selectedValue_Game}
                  style={styles.picker_Game}
                  mode={"dialog"}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue_Game(itemValue)}
                ><Picker.Item label="Select Game" value=""/>
                <Picker.Item label="VALORANT" value="VALORANT" />
                <Picker.Item label="CSGO" value="CSGO"/>
                <Picker.Item label="Warframe" value="Warframe"/>
                <Picker.Item label="LOL" value="LOL"/>
                <Picker.Item label="Overwatch" value="Overwatch"/>
                </Picker>
      
                <TouchableOpacity style={styles.playButton} onPress={async () => {await sendPushNotification(expoPushToken,selectedValue_Game, selectedValue_Squad,navigation);}}>
                  {/* <Text style={styles.text}>PLAY</Text> */}
                  <Image style={styles.logo} source={require("./../assets/images/play-icon.png")}/>
                </TouchableOpacity>
                
                <Picker
                  selectedValue={selectedValue_Squad}
                  style={{ height: 50, width: 180, top: 50}}
                  mode={"dialog"}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue_Squad(itemValue)}
                ><Picker.Item label="Select Squad" value=""/>
                <Picker.Item label="Daphne" value="600166078711"/>
                <Picker.Item label="Vincent" value="600109017235"/>
                <Picker.Item label="Sanjay" value="600178203022"/>
                <Picker.Item label="The boys" value="The boys"/>
                </Picker>
            </View>
        );
      }
 }
 
 // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
 async function sendPushNotification(expoPushToken, gameInfo, squadInfo, navigation) {
   
   console.log(gameInfo,squadInfo);
   
   if(gameInfo == "" && squadInfo == ""){
     alert("Please select a game and squad");
     return;
   } else if(squadInfo==""){
     alert("Please select a squad");
     return;
   } else if(gameInfo == ""){
     alert("Please select a game.");
     return;
   }
   navigation.navigate("Timer");

   const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'PLAY TIME: '+ gameInfo,
    body: 'Enjoy your play~',
    categoryIdentifier: "chat",
    data: { someData: 'goes here' },
  };

   const status = await SMS.sendSMSAsync(
    [squadInfo], 
    "Let's play " + gameInfo + '!',
  );


 
   await fetch('https://exp.host/--/api/v2/push/send', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Accept-encoding': 'gzip, deflate',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(message),
   });
 }
 
 async function registerForPushNotificationsAsync() {
   let token;
   if (Constants.isDevice) {
     const { status: existingStatus } = await Notifications.getPermissionsAsync();
     let finalStatus = existingStatus;
     if (existingStatus !== 'granted') {
       const { status } = await Notifications.requestPermissionsAsync();
       finalStatus = status;
     }
     if (finalStatus !== 'granted') {
       alert('Failed to get push token for push notification!');
       return;
     }
     token = (await Notifications.getExpoPushTokenAsync()).data;
     console.log(token);
   } else {
     alert('Must use physical device for Push Notifications');
   }
 
   if (Platform.OS === 'android') {
     Notifications.setNotificationChannelAsync('default', {
       name: 'default',
       importance: Notifications.AndroidImportance.MAX,
       vibrationPattern: [0, 250, 250, 250],
       lightColor: '#FF231F7C',
     });
   }
 
   return token;
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
   },
   text: {
     fontSize: 30,
     color:"white",
   },
   playButton: {
     elevation:25,
     width: 170,
     height: 170,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 100,
     backgroundColor: '#fff',
   },
   logo:{
     width:53.65,
     height:60.53,
     left:5,
     alignContent:"center",
     justifyContent:"center",
   },
   picker_Game:{
     height: 50, 
     width: 180, 
     bottom: 50,
   },
   picker_Squad:{
     height: 50, 
     width: 180, 
     top: 50,
   },
 });
 
 
 
 