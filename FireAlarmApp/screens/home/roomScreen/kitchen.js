import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import { initializeSocket } from '../../device/socketInstance';
import { useNavigation } from '@react-navigation/native';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const Kitchen = () => {
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const navigation = useNavigation();
    const getSensorData = state => state.sensors.sensorData;

    const getFilteredDevices = createSelector(
        [getSensorData],
        (sensorData) => {
            return Object.values(sensorData).filter(device => device.location === 'Kitchen');
        }
    );
    const filteredDevices = useSelector(getFilteredDevices);


    const getImageForDeviceType = (deviceType) => {
        const typeMap = {
            smoke: require("../../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
            flame: require("../../../assets/images/Flame-Sensor-Detector.jpg"),
            gas: require("../../../assets/images/gas_sensor.jpg"),
            heat: require("../../../assets/images/heat_sensor.jpg"),
            // Add more mappings as needed
        };
        return typeMap[deviceType] || require("../../../assets/images/smoke.png"); // Default image if type not found
    };

    const handlePress = (item) => {
        navigation.navigate("Living_device", { item });
    };


    const renderItem = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[styles.card]}>
                <Image
                    style={styles.image}
                    source={getImageForDeviceType(item.device_type)}
                />
                <View style={styles.sensorContent}>
                    <Text style={styles.titleItem}>SensorId: {item._id_}</Text>
                    <Text style={styles.titleItem}>Type: {item.device_type} Detector</Text>
                    <Text style={styles.titleItem}>Value: {item.value}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container} >
            <FlatList
                data={filteredDevices}
                renderItem={renderItem}
                keyExtractor={item => item._id_}
            // extraData={devices}  // This prop ensures the list updates when `devices` changes
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    cardContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: COLORS.lightWhite,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        shadowColor: "#121211",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10.32,
        elevation: 8,
    },
    image: {
        width: w / 4,
        resizeMode: 'cover',
        height: w / 4,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 20,
        marginHorizontal: 20,
    },
    sensorContent: {
        marginHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center',

    },
    titleItem: {
        fontSize: 15,
        color: COLORS.black,
        fontWeight: 'medium',

    },
    shadow: {
        shadowColor: "#121211",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10.32,
        elevation: 8,
    },

});

export default Kitchen;  