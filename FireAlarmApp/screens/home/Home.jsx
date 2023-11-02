import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import MainHeader from "../../components/Title/MainHeader";
import ScreenHeader from "../../components/Title/ScreenHeader";
import Room from "../../components/Room/Room";
import { ScrollView } from "react-native-gesture-handler";
import { ROOM_LIST, SENSOR_LIST } from "../../assets/data/room";
import SectionHeader from "../../components/Title/SectionHeader";
import SensorList from "../../components/Sensor/SensorList";
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import WebSocket from 'react-native-websocket';


const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);
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
          data: '50',
          description:
            'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
        },
        {
          id: 7,
          image: require('../../assets/images/humiditypng.png'),
          title: 'Temp',
          data: '50',
          description:
            "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
        },
        {
          id: 8,    
          image: require('../../assets/images/temperature.png'),
            title: 'Humidity',
            data: '40',
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

   const ws = new WebSocket('ws://localhost:3000'); 

  // useEffect(() => {
  //   // Fetch sensor data from your API
  //   fetch('http://192.168.137.1:3056/api/temperature-data') // Replace with your API URL
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSensorData(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.error('Error fetching sensor data:', error));
  // }, []);

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const sensorIdToUpdate = 7; // ID của sensor bạn muốn cập nhật

      // Kiểm tra xem dữ liệu có phải là loại "temperature" không
      if (data.data.type === 'temperature') {
        // Tìm sensor cần cập nhật trong danh sách và thay thế giá trị "data" bằng giá trị mới
        const updatedSensors = sensors.map((sensor) => {
          if (sensor.id === sensorIdToUpdate) {
            return { ...sensor, data: data.data.value.toString() };
          }
          return sensor;
        });

        // Cập nhật biến trạng thái sensors với danh sách đã cập nhật
        setSensors(updatedSensors);
      }
    };

    return () => {
      ws.close();
    };
  }, [sensors]); // Đảm bảo rằng sự thay đổi trong danh sách sensors sẽ gọi lại hiệu ứng




  // // Find the latest temperature data
  // const latestTemperatureData = sensorData
  //   .filter((item) => item.data.type === 'temperature')
  //   .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  return (
    <View style={styles.container}>
      <MainHeader title="Welcome back" />
      <ScreenHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.textStyle}>Rooms</Text>
        <Room list_room={ROOM_LIST} />
        <SectionHeader title="Sensors" />
        {sensors.length > 0 ? (
          <SensorList list={sensors} />
        ) : (
          <ActivityIndicator size="large" color={COLORS.primary} />
        )}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  textStyle: {
    fontSize: SIZES.xLarge,
    paddingHorizontal: 25,
  },
});
export default Home;
