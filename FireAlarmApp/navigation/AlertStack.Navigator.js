import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Alert from '../screens/Alert/Alert';
import DetailAlert from '../screens/Alert/DetailAlert';
import { COLORS } from '../constants/theme';
import Header from '../components/Title/Header';
const AlertStack = createStackNavigator();

function AlertStackNavigator() {
    return (
        <AlertStack.Navigator
        // screenOptions={({ navigation }) => ({
        //     header: ({ scene, previous, navigation }) => {

        //         return <Header title={title} navigation={navigation} />;
        //     },
        // })}
        >
            <AlertStack.Screen
                name="Alert"
                component={Alert}
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

            <AlertStack.Screen
                name="Detail Alert"
                component={DetailAlert}
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



        </AlertStack.Navigator>
    );
}

export default AlertStackNavigator;
