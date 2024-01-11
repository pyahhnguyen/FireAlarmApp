import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Onboarding } from "./screens";
import { SplashScreen } from "./screens";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Welcome from "./screens/auth/Welcome";
import Living from "./screens/home/roomScreen/living";
import Bedroom from "./screens/home/roomScreen/bedroom";
import Alert_PopUp from "./screens/Alert/pop-up_screen";
import DetailProfile from "./screens/profile/DetailProfile";
import EditProfile from "./screens/profile/EditProfile";
import { COLORS } from "./constants/theme";
const Stack = createNativeStackNavigator();



export default function App() {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Onboard"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bottom"
          component={BottomTabNavigation}
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
          name="Home"
          component={Home}
          options={{ 
            headerShown: false,
            headerStyle: {
              backgroundColor: "transparent",
             
              
            }, }}
        />

        <Stack.Screen
          name="Living"
          component={Living}
          options={{ 
            headerShown: true, 
            headerTitle: "Living Room",
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: COLORS.background,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              
            },
            
          }}
        />
      
        <Stack.Screen
          name="Bedroom"
          component={Bedroom}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
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
          component={Bedroom}
          options={{
            headerShown: true,
        
          }}
        />


          {/* <Stack.Screen
          name="PopUp"
          component={Alert_PopUp}
          options={{
            headerShown: false,
          }}
        /> */}

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



      </Stack.Navigator>
    </NavigationContainer>
  );
}
