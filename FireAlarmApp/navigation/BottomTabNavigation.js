import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Chat, Location } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/theme";
import DeviceStackNavigator from "./DeviceStack.Navigator";
import AlertStackNavigator from "./AlertStack.Navigator";
import HomeStackNavigator from "./HomeStack.Navigator";
  const Tab = createBottomTabNavigator();

  const tabBarStyle = {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    flex: 1,
    width: "100%",
    overflow: "hidden",
    margin: 0,
    backgroundColor: COLORS.lightWhite,
  };

  function BottomTabNavigation() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarHideKeyboard={true}
        barStyle={{ paddingBottom: 20 }}
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Devices") {
              iconName = "reader";
            } else if (route.name === "Alerts") {
              iconName = "bonfire";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={26} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            headerShown: false,
            unmountOnBlur: true, // Add this line

          }}
        />
        <Tab.Screen
          name="Alerts"
          component={AlertStackNavigator}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="Devices"
          component={DeviceStackNavigator}
          options={{
            headerShown: false,
            unmountOnBlur: true, // Add this line
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarStyle: tabBarStyle,
          }}
        />
        
      
      </Tab.Navigator>
    );
  }

  export default BottomTabNavigation;
