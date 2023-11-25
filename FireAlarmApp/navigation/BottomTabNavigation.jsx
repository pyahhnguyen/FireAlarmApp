import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Chat, Location } from "../screens";
import Device from "../screens/device/Device";
import Alert from "../screens/Alert/Alert";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  borderRadius: 20,
  position: "absolute",
  flex: 1,
  width: "100%",
  overflow: "hidden",
  margin: 0,
  backgroundColor: COLORS.lightWhite,
};

function BottomTabNavigation() {
  const activeColor = "#FF6C52";
  const inactiveColor = "#888b8f";


  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarHideKeyboard={true}
      barStyle={{ paddingBottom: 20}}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Device") {
            iconName = "reader";
          } else if (route.name === "Alert") {
            iconName = "bonfire";
          } else if (route.name === "Location") {
            iconName = "location";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: '#FF9209',
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{         
          headerShown: false,       
          tabBarStyle: tabBarStyle,
        
           
        }}
      />

      <Tab.Screen
        name="Alert"
        component={Alert}
        options={{
          // tabBarLabel: "Alert",
          // tabBarLabelStyle: ({ focused }) => ({
          //   color: focused ? activeColor : inactiveColor,
          // }),
          tabBarStyle: tabBarStyle,
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: COLORS.primary,
        
          }
        }
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          tabBarStyle: tabBarStyle,
          backgroundColor: COLORS.lightWhite,
        }}
      />

      <Tab.Screen
        name="Device"
        component={Device}
        options={{
          headerShown: true,
          tabBarStyle: tabBarStyle,
          headerTitleAlign: "center",
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
