import { View, Text } from "react-native";
import React, {useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Chat, Location } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS } from "../constants/theme";
const Tab = createBottomTabNavigator();

const tabBarStyle = {
  // padding: 10,
  borderRadius: 20,
  height: 80,
  position: "absolute",
  flex: 1,
  width: "100%",
  overflow: "hidden",
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FF6C52"
      tabBarHideKeyboard={true}
      headerShown={false}
      inactiveColor="#CDCFCE"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color : "#FF6C52" },
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name={focused ? "home" : "home-outline"}
            color={focused ? "#FF6C52" : "#CDCFCE"}
              size={26}
            />
          ),
          // tabBarIcon: ({ focused }) => 
          //   focused ? (
          //   <Entypo name="home" size={24} color="#FF6C52" /> ):(
          //   <Ionicons
          //     name={focused ? "home" : "home-outline"}
          //     color={focused ? "#FF6C52" : "#CDCFCE"}
          //     size={26}
          //   />
          // ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: "Location",
          tabBarLabelStyle: { color : "#FF6C52" },
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              color={focused ? "#FF6C52" : "#CDCFCE"}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              color={focused ? "#FF6C52" : "#CDCFCE"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? "#FF6C52" : "#CDCFCE"}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
