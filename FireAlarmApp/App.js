import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import UserNavigator from "./navigation/UserStack.Navigation";
import Login from "./screens/auth/Login";
import Entypo from "@expo/vector-icons/Entypo";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "./Context/store/Auth";
import AuthGlobal from "./Context/store/AuthGlobal";
import CommonStackNavigation from "./navigation/CommonStack.Navigator";
import store from "./redux/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { setLoginState } from "./redux/action";
import { View, Image ,ActivityIndicator } from "react-native"; 
import { COLORS } from "./constants/theme";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Failed to get push token for push notification!"
      );
      return;
    }
    token = await Notifications.getDevicePushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token.data);
  } else {
    handleRegistrationError("Must use physical device for Push Notifications");
  }
  AsyncStorage.setItem("deviceToken", token.data);
  return token.data;
}
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginData = await AsyncStorage.getItem("loginData");
        console.log('loginData:', loginData);
        if (loginData) {
          dispatch(setLoginState(JSON.parse(loginData)));
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
      }
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{resizeMode:"contain" }}>
        <Image source={require("./assets/images/splash.png")} />
      </View>
    );
  }

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" color={COLORS.lightWhite} />
  //     </View>
  //   )
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="CommonStack" component={CommonStackNavigation} />
        ) : (
          <Stack.Screen name="UserNavigator" component={UserNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deviceToken, setDeviceToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setDeviceToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const fonts = {
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
  };

  const [fontsLoaded] = useFonts(fonts);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
