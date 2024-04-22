import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';
import { COLORS, SIZES } from '../../../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";


const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;


const Bedroom = () => {
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

        const socketUrl = 'http://192.168.1.247:8000'; // Modify with your server URL

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

    fetchData();
  }, []);

  return (
    <View >
      <View style={[styles.card]}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/smoke.png")}
        />
        <View>
          <Text style={styles.titleItem}>Sensor #1</Text>
          <Text style={styles.titleItem}>Type: Smoke Detector</Text>
          <Text style={styles.titleItem}>Status: Normal </Text>
          <Text style={styles.titleItem}>Warning: 1</Text>
          <Text style={styles.titleItem}>Value: {receivedMessage !== null ? receivedMessage : '25'}</Text>

        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,

  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: COLORS.,

  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    marginVertical: 10,
    // justifyContent: 'space-between',

  },
  image: {
    width: w / 3.5,
    resizeMode: 'cover',
    height: w / 3.5,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    marginRight: 50,


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

export default Bedroom;  