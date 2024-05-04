import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Living from '../screens/home/roomScreen/living'
import Bedroom from '../screens/home/roomScreen/bedroom'
// import Kitchen from '../screens/home/roomScreen/kitchen'
// import Bathroom from '../screens/home/roomScreen/bathroom'
import Popup_alert from '../screens/Alert/pop-up-alert'
import DetailProfile from '../screens/profile/DetailProfile'
import EditProfile from '../screens/profile/EditProfile'
import BottomTabNavigation from './BottomTabNavigation';
import { COLORS } from '../constants/theme';
import Login from '../screens/auth/Login';
const Tab = createStackNavigator();

function CommonStackNavigation() {
    return (

        <Tab.Navigator>
            <Tab.Screen
                name="BottomTabs"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Living"
                component={Living}
                options={{
                    headerShown: true,
                    headerTitle: "Living Room",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                }}
            />

            <Tab.Screen
                name="Bedroom"
                component={Bedroom}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                }}
            />
            <Tab.Screen
                name="Kitchen"
                component={Bedroom}
                options={{ headerShown: true }}
            />
            <Tab.Screen
                name="Bathroom"
                component={Bedroom}
                options={{
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="PopUp"
                component={Popup_alert}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="DetailProfile"
                component={DetailProfile}
                options={{
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerShown: false,
                }}
            />
            
        </Tab.Navigator>
    );
}

export default CommonStackNavigation;
