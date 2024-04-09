import { StyleSheet, Text, View, useState } from 'react-native'
import React from 'react'
import SensorList from '../../../components/Sensor/SensorList'
import { SENSOR_LIST } from '../../../assets/data/room'


const Bedroom = () => {
    // const [sensors, setSensors] = useState(SENSOR_LIST);
    
    return (
        <View style={styles.container}>           
        {/* <SensorList list={sensors} /> */}

        <Text >'bbbbbb'</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Add any additional styles you want for the container
      },
    });
    
    export default Bedroom;