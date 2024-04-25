import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook
import Device from '../screens/device/Device';
import DetailDevice from '../screens/device/DetailDevice';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const DeviceStack = createStackNavigator();

function DeviceStackNavigator({ navigation }) {
    const isFocused = useIsFocused(); // Check if the screen is focused

    // Reset stack when the screen is focused again
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            if (isFocused) {
                e.preventDefault(); // Prevent default behavior
                // Reset the stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Device' }], // Replace 'Device' with your initial route name
                });
            }
        });

        return unsubscribe;
    }, [isFocused, navigation]);


    const commonHeaderOptions = ({ navigation, route }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.black,
        headerStyle: {
            backgroundColor: COLORS.background,
            height: 90,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        headerBackTitleVisible: false,

        headerRight: () => (
            <Ionicons
                name="notifications"
                size={23}
                color={COLORS.primary}
                onPress={() => navigation.navigate('Alerts')}
                style={{ marginRight: 15 }}
            />
        ),
    });
    return (

        <DeviceStack.Navigator screenOptions={commonHeaderOptions}>
            <DeviceStack.Screen
                name="Device"
                component={Device}
                options={({ route }) => ({
                    title: route.params?.title || "Devices",
                })}
            />
            <DeviceStack.Screen
                name="Detail Device"
                component={DetailDevice}
                options={({ route }) => ({
                    title: route.params?.title || "Detail Device",
                })}
            />
        </DeviceStack.Navigator>

    );
}

export default DeviceStackNavigator;
