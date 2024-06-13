import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import Onboarding from '../screens/onboarding/Onboarding'
import Welcome from '../screens/auth/Welcome'
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Onboard"
                component={Onboarding}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}