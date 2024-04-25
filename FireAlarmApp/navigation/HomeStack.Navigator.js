import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Alert_History_Detail from '../screens/home/alert_history_detail';
import History_Location from '../screens/home/alert_history_location';
import { Home } from '../screens';
import { COLORS } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

const HomeStack = createStackNavigator();

// function LogoTitle() {
//     return (
//         <Image
//             style={{ width: 25, height: 25 }}
//             source={require('../assets/images/icons/google_96px.png')}
//             backgroundColor

//         />
//     );
// }

function HomeStackNavigator({ navigation }) {
    const isFocused = useIsFocused(); // Check if the screen is focused

    // Reset stack when the screen is focused again
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            if (isFocused) {
                e.preventDefault(); // Prevent default behavior
                // Reset the stack
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home_Stack' }], // Replace 'Device' with your initial route name
                });
            }
        });

        return unsubscribe;
    }, [isFocused, navigation]);

    return (
        <HomeStack.Navigator>


            <HomeStack.Screen
                name="Home_Stack"
                component={Home}
                options={{
                    headerShown: false

                    // headerTitle: (props) => <LogoTitle {...props} />,


                }}
            />

            <HomeStack.Screen
                name="Alert_History"
                component={Alert_History_Detail}
                options={{
                    headerShown: true,
                    headerTitle: "Alert History",
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

            <HomeStack.Screen
                name="Location"
                component={History_Location}
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTintColor: COLORS.black,
                    backgroundColor: COLORS.lightWhite,
                    headerStyle: {
                        backgroundColor: COLORS.background,
                        height: 90,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    },
                }}
            />




        </HomeStack.Navigator>
    );
}

export default HomeStackNavigator;
