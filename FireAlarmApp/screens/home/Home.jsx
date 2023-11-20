import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import MainHeader from "../../components/Title/MainHeader";
import ScreenHeader from "../../components/Title/ScreenHeader";
import Room from "../../components/Room/Room";
import { ScrollView } from "react-native-gesture-handler";
import { ROOM_LIST  } from "../../assets/data/room";
import SectionHeader from "../../components/Title/SectionHeader";
import SensorList from "../../components/Sensor/SensorList";
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { io } from "socket.io-client";

const Home = () => {
  
  const [sensors, setSensors] = useState([

    {
          id: 5,
          image: require('../../assets/images/Co2.png'),
          title: 'CO2',
          data: '300',
          description:
            'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
        },
        {
          id: 6,
          image: require('../../assets/images/smoke.png'),
          title: 'Smoke',
          data: '1243',
          description:
            'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
        },
        {
          id: 7,
          image: require('../../assets/images/humiditypng.png'),
          title: 'Temp',
          data: '32',
          description:
            "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
        },
        {
          id: 8,    
          image: require('../../assets/images/temperature.png'),
            title: 'Humidity',
            data: '87',
            description:
                'Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture',
            },
        {
            id: 9,
            image: require('../../assets/images/kitchen.jpg'),
            title: 'Kitchen',
            location: 'Japan',
            description:
              "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
          },
          {
            id: 10,    
            image: require('../../assets/images/bathroom.jpg'),
              title: 'Bathroom',
              location: 'France',
              description:
                  'Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture',
              },


  ]);

  useEffect(() => {
    const ws = new WebSocket('ws://10.0.227.224:3001'); 
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        const updatedSensors = [...sensors]; // Tạo một bản sao của danh sách cảm biến hiện tại

        data.forEach((sensorData) => {
          if (sensorData.data && sensorData.data.type) {
            const sensorType = sensorData.data.type;

            // Tìm cảm biến trong danh sách dựa trên loại cảm biến
            const sensorToUpdate = updatedSensors.find(
              (sensor) => sensor.title.toLowerCase() === sensorType.toLowerCase()
            );

            if (sensorToUpdate) {
              sensorToUpdate.data = sensorData.data.value.toString();
            }
          }
        });

        setSensors(updatedSensors);
      }
    };

    return () => {
      ws.close();
    };
  }, [sensors]);


  // // Find the latest temperature data
  // const latestTemperatureData = sensorData
  //   .filter((item) => item.data.type === 'temperature')
  //   .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  return (
    <View style={styles.container}>
      <MainHeader title="Hi, Welcome back!" />
      {/* <ScreenHeader /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.textStyle}>Rooms</Text>
        <Room list_room={ROOM_LIST} />
        <SectionHeader title="Devices" />
        <SectionHeader title="News" />
        {/* {sensors.length > 0 ? (
          <SensorList list={sensors} />
        ) : (
          <ActivityIndicator size="large" color={COLORS.primary} />
        )} */}
      </ScrollView>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  textStyle: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    paddingHorizontal: 25,
    color: COLORS.dark,
  },
});
export default Home;
