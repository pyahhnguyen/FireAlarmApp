import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Living from '../screens/home/roomScreen/living'
import Bedroom from '../screens/home/roomScreen/bedroom'
import Living_Device from '../screens/home/roomScreen/living_device'
import Kitchen from '../screens/home/roomScreen/kitchen'
import Bathroom from '../screens/home/roomScreen/bathroom'
// import Kitchen from '../screens/home/roomScreen/kitchen'
// import Bathroom from '../screens/home/roomScreen/bathroom'
import Popup_alert from '../screens/Alert/pop-up-alert'
import DetailProfile from '../screens/profile/DetailProfile'
import EditProfile from '../screens/profile/EditProfile'
import BottomTabNavigation from './BottomTabNavigation';
import { COLORS } from '../constants/theme';
import { updateSensorData } from "../redux/actions/sensor.action";
import { initializeSocket } from "../screens/device/socketInstance";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Tab = createStackNavigator();
function CommonStackNavigation() {
    const dispatch = useDispatch();
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");

    useEffect(() => {
        let socket;
        const setupSocket = async () => {
            socket = await initializeSocket(); // Wait for the socket to be initialized
            if (!socket) {
                console.error("Failed to initialize socket.");
                return;
            }
            socket.on("connect", () => {
                setConnectionStatus("Connected");
            });
            socket.on("message", (message) => {
                const newData = JSON.parse(message);
                // console.log("New data received:", newData);
                const valueStandards = {
                    'smoke': 1900,
                    'heat': 150,
                    'gas': 1000,
                    'flame': 1900,
                };
                const valueStandard = valueStandards[newData.device_type] || 1000;
                const exceedsStandard = newData.value > valueStandard;
                const updatedData = {
                    ...newData,
                    device_id: newData._id_,
                    status: exceedsStandard ? "Alarm" : "Normal",
                    warning: exceedsStandard ? "1" : "0",
                };
                dispatch(updateSensorData({ [newData._id_]: updatedData })); // Correct key usage here
            });

            socket.on("subscribed", (response) => {
                console.log("Subscription confirmation received:", response);
            });

            socket.on("error", (error) => {
                console.error("Error encountered:", error);
            });

            socket.on("disconnect", (reason) => {
                setConnectionStatus(`Disconnected: ${reason}`);
            });

            socket.on("close", () => {
                console.log("Socket closed unexpectedly.");
            });
        };

        setupSocket(); // Call the async function to setup the socket

        return () => {
            if (socket) {
                socket.disconnect(); // Clean up socket connection when component unmounts
            }
        };
    }, []);
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
                name="Living_device"
                component={Living_Device}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitle: "Chart",
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
                component={Kitchen}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                }}
            />
            <Tab.Screen
                name="Bathroom"
                component={Bathroom}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
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
