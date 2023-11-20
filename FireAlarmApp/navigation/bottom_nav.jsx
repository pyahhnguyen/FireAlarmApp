import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Profile, Chat, Location } from "../screens";
import Device from "../screens/device/Device";
import Alert from "../screens/Alert/Alert";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator
            initialRouteName="Home"
            headerShown={false}
           
            screenOptions={({route, navigation}) => ({
                tabBarIcon:({focused, color, size}) => {
                    let iconName;
            
                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Device") {
                        iconName1 = "featured-play-list";
                        
                    } else if (route.name === "Alert") {
                        iconName = "notifications";
                    }
                    
                return <Ionicons name={iconName} size={size} color={color} />;
               

                },
                tabBarActiveTintColor: COLORS.primary,
            })}
        >
            <Tab.Screen name="Home" component={Home} options={headerShown=false}/>
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Device" component={Device} />
            <Tab.Screen name="Alert" component={Alert} />
        </Tab.Navigator>
    )
}

export default TabGroup;