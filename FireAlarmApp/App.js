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
import store from "./redux/store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { setLoginState } from "./redux/actions/action";
import { Text } from "react-native";




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  // console.log("isLoggedIn:", isLoggedIn);
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
        else {
          // If no login data, make sure user is marked as logged out in Redux
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();

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
        console.log("DeviceToken:", token);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  

  if (!appIsReady || !fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
