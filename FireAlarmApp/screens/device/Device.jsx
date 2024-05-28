import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import { device_data } from "../../constants/device-data";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { initializeSocket } from "./socketInstance";
import { useDispatch, useSelector } from 'react-redux';
import { updateSensorData } from "../../redux/actions/sensor.action";

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const Device = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sensors, setSensors] = useState([]);
  const navigation = useNavigation();
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  // const [data, setData] = useState({});
  const dispatch = useDispatch();
  const data = useSelector(state => state.sensors.sensorData);
  // console.log("Data:", data);
  useEffect(() => {
    let socket;
    const setupSocket = async () => {
      socket = await initializeSocket(); // Wait for the socket to be initialized
      if (!socket) {
        console.error("Failed to initialize socket.");
        return;
      }
      socket.on("connect", () => {
        setConnectionStatus("Connected");
      });

      socket.on("message", (message) => {
        const newData = JSON.parse(message);
        const valueStandards = {
          smoke: 1500, // Example standard value for temperature sensor
          heat: 150,
          gas: 900,
          flame: 1700,
        };
        const valueStandard = valueStandards[newData.device_type] || 1000;
        const exceedsStandard = newData.value > valueStandard;
        const updatedData = {
          ...newData,
          device_id: newData._id_,
          status: exceedsStandard ? "Alarm" : "Normal",
          warning: exceedsStandard ? "1" : "0",
        };

        dispatch(updateSensorData({ [newData._id_]: updatedData })); // Correct key usage here

        // setData((prevData) => ({
        //   ...prevData,
        //   [updatedData._id_]: updatedData,
        // }));
      });

      socket.on("subscribed", (response) => {
        console.log("Subscription confirmation received:", response);
      });

      socket.on("error", (error) => {
        console.error("Error encountered:", error);
      });

      socket.on("disconnect", (reason) => {
        setConnectionStatus(`Disconnected: ${reason}`);
      });

      socket.on("close", () => {
        console.log("Socket closed unexpectedly.");
      });
    };

    setupSocket(); // Call the async function to setup the socket

    return () => {
      if (socket) {
        socket.disconnect(); // Clean up socket connection when component unmounts
      }
    };
  }, []);

  const sensorTypeImages = {
    smoke: require("../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
    heat: require("../../assets/images/heat_sensor.jpg"),
    gas: require("../../assets/images/gas_sensor.jpg"),
    flame: require("../../assets/images/Flame-Sensor-Detector.jpg"),
  };

  const handlePress = (item) => {
    navigation.navigate("Detail Device", { item });
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item, index }) => {
    const getItemColor = () => {
      // Example condition, you can replace it with your logic
      if (item.warning === "1") {
        return COLORS.yellow; // Set color to green for active status
      } else {
        return COLORS.white; // Set color to red for other statuses
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={{
          marginVertical: 8,
          marginHorizontal: 12,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <View style={[styles.card, { backgroundColor: getItemColor() }]}>
          <Image
            style={styles.image}
            source={sensorTypeImages[item.device_type]}
          />
          <View style={styles.sensorContent}>
            <Text style={styles.titleBold}>
              {item.device_name || "MQ2 Smoke Alarm"}
            </Text>
            <Text style={styles.titleItem}>
              Honeywell BW-Input: {item.model_code || "29352"}
            </Text>
            <Text style={styles.titleItem}>
              Status: {item.status || "Active"}
            </Text>
            <Text style={styles.titleItem}>
              Warning: {item.warning || "None"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <FlatList
        data={Object.values(data) || device_data}
        renderItem={renderItem}
        keyExtractor={(item) => item.device_id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    paddingVertical: 10,
  },
  image: {
    width: w / 4.5,
    height: w / 4.5,
    resizeMode: "contain",
    backgroundColor: COLORS.lightWhite,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleItem: {
    fontSize: 14,
  },
  titleBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sensorContent: {
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default Device;
