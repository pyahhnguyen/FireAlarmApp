import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from "react-native";
import axios from "axios";
import { COLORS, SIZES } from "../../constants/theme";
import { device_data } from "../../constants/device-data";
const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
const Device = () => {
  const [sensors, setSensors] = useState([]);
  const navigation = useNavigation();

 // useEffect(() => {
    // Dummy data loading logic, replace URL with your actual API endpoint
  //}, []);

  const sensorTypeImages = {
    "smoke": require("../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
    "heat": require("../../assets/images/heat_sensor.jpg"),
    "gas": require("../../assets/images/gas_sensor.jpg"),
    "flame": require("../../assets/images/Flame-Sensor-Detector.jpg"),
  };
  
  const handlePress = (item) => {
    navigation.navigate('Detail Device', { item }); // Pass item data to details screen
  };


  const renderItem = ({ item, index }) => {
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
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={sensorTypeImages[item.device_type]}
          />
          <View style={styles.sensorContent}>
            <Text style={styles.titleBold}>{item.device_name || "MQ2 Smoke Alarm"}</Text>
            <Text style={styles.titleItem}>Honeywell BW-Input: {item.code || "29352"}</Text>
            <Text style={styles.titleItem}>Status: {item.status || "Active"}</Text>
            <Text style={styles.titleItem}>Warning: {item.warning || "None"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <FlatList
        data={device_data}
        renderItem={renderItem}
        keyExtractor={item => item.device_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
   //marginBottom: h/20
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
