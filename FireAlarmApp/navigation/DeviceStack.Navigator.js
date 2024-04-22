import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Device from '../screens/device/Device';
import DetailDevice from '../screens/device/DetailDevice'; // Example of a detailed screen within the Device tab
import { COLORS } from '../constants/theme';

const DeviceStack = createStackNavigator();

function DeviceStackNavigator() {
    return (
        <DeviceStack.Navigator>
            <DeviceStack.Screen name="Device"
                component={Device}
                options={{
                    headerShown: true,

                    headerTintColor: COLORS.black,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        height: 100,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    },
                }} />
            <DeviceStack.Screen
                name="Detail Device"
                component={DetailDevice}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.black,
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        height: 90,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                    },
                }}
            />
        </DeviceStack.Navigator>
    );
}

export default DeviceStackNavigator;
