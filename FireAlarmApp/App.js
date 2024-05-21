import React, { useEffect, useState, useRef } from "react";
import { View, Image, Platform, Alert, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import UserNavigator from "./navigation/UserStack.Navigation";
import Entypo from "@expo/vector-icons/Entypo";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonStackNavigation from "./navigation/CommonStack.Navigator";
import store from "./redux/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { setLoginState } from "./redux/action";
// import * as Linking from 'expo-linking';
// import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';


// Notification handling configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Error', 'Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getDevicePushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    try {
      await AsyncStorage.setItem('deviceToken', token.data);
    } catch (error) {
      console.error('AsyncStorage error: ', error.message);
    }
  } else {
    Alert.alert('Error', 'Must use physical device for Push Notifications');
  }
  return token?.data;
}

function RootNavigation() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigationRef = useRef(null);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const loginData = await AsyncStorage.getItem("loginData");
        console.log("LoginData:", loginData);
        if (loginData) {
          dispatch(setLoginState(JSON.parse(loginData)));
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log("Notification data:", data);
      if (data && data.targetScreen && navigationRef.current) {
        navigationRef.current.navigate('CommonStack', {
          screen: 'BottomTabs',
          params: { screen: data.targetScreen },
        });
      }
    });

    return () => Notifications.removeNotificationSubscription(responseListener);

  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="CommonStack" component={CommonStackNavigation} />
        ) : (
          <Stack.Screen name="UserNavigator" component={UserNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({

    ...Entypo.font,
    regular: require("./assets/fonts/regular.otf"),
    bold: require("./assets/fonts/bold.otf"),
    light: require("./assets/fonts/light.otf"),
    medium: require("./assets/fonts/medium.otf"),
    xtrabold: require("./assets/fonts/xtrabold.otf"),
    regular_poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    bold_poppins: require("./assets/fonts/Poppins-Bold.ttf"),
    light_poppins: require("./assets/fonts/Poppins-Light.ttf"),
    medium_poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    xtrabold_poppins: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold_poppins: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        const token = await registerForPushNotificationsAsync();
        console.log("Push token:", token);
        // Check Firebase app configuration
        // console.log("Firebase apps initialized: ", firebase.apps.length);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);


  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     // return Fcm token for device 
  //     messaging().getToken().then(token => {
  //       console.log("Fcm token", token)
  //     });
  //   }
  //   else {
  //     console.log("Permission not granted", authStatus)
  //   }

  //   messaging().getInitialNotification().then(async (remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log('Notification caused app to open from quit state:', 
  //       remoteMessage.notification);
  //     }
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('Notification caused app to open from background state:', 
  //     remoteMessage.notification);
  //   })

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
    
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

  //   });    
    
  //   return unsubscribe;


  // },[]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
