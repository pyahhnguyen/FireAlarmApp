import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


const CustomHeader = ({ navigation, title }) => {
    // const handleRefresh = () => {
    //     navigation.replace(navigation.dangerouslyGetState().routes[navigation.dangerouslyGetState().index].name);
    // };
    // const handleNotifications = () => {
    //     // Implement your notification logic here
    // };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>

                <EvilIcons name="refresh" size={24} color="black" />

                <Ionicons name="notifications" size={24} color="black" />


            </View>
        </View>
    );
};

export default CustomHeader;
