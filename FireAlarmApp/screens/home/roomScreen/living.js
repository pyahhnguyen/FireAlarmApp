import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';
import { COLORS, SIZES } from '../../../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;
// import { IPHOST, PORT_WS } from '@env'

const apiUrl = Constants.expoConfig.extra.IP_HOST;

const Living = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [client_id, setX_client_id] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('x_client_id');
        const storedToken = await AsyncStorage.getItem('refreshToken');
        setX_client_id(storedUserId);
        setRefreshToken(storedToken);

        const socketUrl = `http://${apiUrl}:${PORT_WS}`; // Modify with your server URL

        const options = {
          query: { token: storedToken, userId: storedUserId },
          transports: ['websocket'],
          forceNew: true,
        };

        const socket = io(socketUrl, options);

        socket.on('connect', () => {
          console.log('Successfully connected to the server!');
        });

        socket.on('message', (message) => {
          console.log('Received message:', message);
          // Parse the JSON payload to access the value data
          const payload = JSON.parse(message);
          if (payload && payload.value !== undefined) {
            setReceivedMessage(payload.value); // Update the value data state
          }
        });

        socket.on('error', (error) => {
          console.error('Error encountered:', error);
        });

        socket.on('disconnect', (reason) => {
          console.log('Disconnected:', reason);
        });

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
    // fetchData();
  }, []);

  return (
    <View style={styles.container} >


      <TouchableOpacity style={[styles.card]}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/smoke.png")}
        />
        <View style={styles.sensorContent}>
          <Text style={styles.titleItem}>Sensor #1</Text>
          <Text style={styles.titleItem}>Type: Smoke Detector</Text>
          <Text style={styles.titleItem}>Status: Normal </Text>
          <Text style={styles.titleItem}>Value: {receivedMessage !== null ? receivedMessage : '25'}</Text>

        </View>

      </TouchableOpacity>
      <TouchableOpacity style={[styles.card]}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/Flame-Sensor-Detector.jpg")}
        />
        <View style={styles.sensorContent}>
          <Text style={styles.titleItem}>Sensor #2</Text>
          <Text style={styles.titleItem}>Type: Flame Detector</Text>
          <Text style={styles.titleItem}>Status: Normal </Text>
          <Text style={styles.titleItem}>Value: {receivedMessage !== null ? receivedMessage : '25'}</Text>

        </View>

      </TouchableOpacity>
      <TouchableOpacity style={[styles.card]}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/gas_sensor.jpg")}
        />
        <View style={styles.sensorContent}>
          <Text style={styles.titleItem}>Sensor #3</Text>
          <Text style={styles.titleItem}>Type: Gas Detector</Text>
          <Text style={styles.titleItem}>Status: Normal </Text>
          <Text style={styles.titleItem}>Value: {receivedMessage !== null ? receivedMessage : '25'}</Text>

        </View>

      </TouchableOpacity>
      <TouchableOpacity style={[styles.card]}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/heat_sensor.jpg")}
        />
        <View style={styles.sensorContent}>
          <Text style={styles.titleItem}>Sensor #4</Text>
          <Text style={styles.titleItem}>Type: Heat Detector</Text>
          <Text style={styles.titleItem}>Status: Normal </Text>
          <Text style={styles.titleItem}>Value: {receivedMessage !== null ? receivedMessage : '25'}</Text>

        </View>

      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 5,

  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: COLORS.,

  },
  card: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
    // justifyContent: 'space-between',

  },
  image: {
    width: w / 4,
    resizeMode: 'cover',
    height: w / 4,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  sensorContent:{
    marginHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
    
  },
  titleItem: {
    fontSize: SIZES.h3,
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

export default Living;  