import React, { useCallback, useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { Home, Onboarding } from "./screens";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Welcome from "./screens/auth/Welcome";
import Living from "./screens/home/roomScreen/living";
import DetailProfile from "./screens/profile/DetailProfile";
import EditProfile from "./screens/profile/EditProfile";
import Popup_socket from "./screens/Alert/pop-up-alert";
import { COLORS } from "./constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


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
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  return token.data;
  
}
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Check authentication state on app startup
  useEffect(() => {
    // Retrieve authentication state from storage
    const checkAuthentication = async () => {
      const storedLoggedInStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(storedLoggedInStatus === "true");
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

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

  const [fontsLoaded] = useFonts({
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

  const onLayoutRootView = useCallback(async () => {
    if (!fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Bottom"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Living"
              component={Living}
              options={{
                headerShown: true,
                headerTitle: "Living Room",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.background,
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Stack.Screen
              name="Bedroom"
              component={Living}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.background,
                },
              }}
            />

            <Stack.Screen
              name="Kitchen"
              component={Living}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="Bathroom"
              component={Living}
              options={{
                headerShown: true,
              }}
            />

            <Stack.Screen
              name="PopUp"
              component={Popup_socket}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="DetailProfile"
              component={DetailProfile}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboard"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bottom"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Living"
              component={Living}
              options={{
                headerShown: true,
                headerTitle: "Living Room",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.background,
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                },
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
            <Stack.Screen
              name="Bedroom"
              component={Living}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: COLORS.background,
                },
              }}
            />

            <Stack.Screen
              name="Kitchen"
              component={Living}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="Bathroom"
              component={Living}
              options={{
                headerShown: true,
              }}
            />

            <Stack.Screen
              name="PopUp"
              component={Popup_socket}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="DetailProfile"
              component={DetailProfile}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: false,
              }}
            />

            {/* Add other screens for non-logged-in users */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
