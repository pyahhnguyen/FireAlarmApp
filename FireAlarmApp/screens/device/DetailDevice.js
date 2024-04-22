import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const DeviceDetails = ({ route }) => {

  const w = Dimensions.get('screen').width;;
  const h = Dimensions.get('screen').height;
  const { item } = route.params;


  // sensorTypeImages 
  const sensorTypeImages = {
    "smoke": require("../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
    "heat": require("../../assets/images/heat_sensor.jpg"),
    "gas": require("../../assets/images/gas_sensor.jpg"),
    "flame": require("../../assets/images/Flame-Sensor-Detector.jpg"),
  };
  // Define a mapping between locations and floor plan images
  const locationImages = {
    "Living Room": require("../../assets/images/Planner_Living_fire.png"),
    'Kitchen': require("../../assets/images/Planner_Kitchen_fire.png"),
    "Bed Room": require("../../assets/images/Planner_Bedroom_fire.png"),
    "Bath Room": require("../../assets/images/Planner_Bathroom_fire.png"),
    // Add more locations as needed
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        <Image
          source={sensorTypeImages[item.device_type]}
          resizeMode="center"
          style={{
            width: 70,
            height: 70,
            marginLeft: 15,
            backgroundColor: COLORS.lightWhite,
            borderRadius: 5,
          }}
        />
        <View style={{ flex: 1, alignContent: "center", marginLeft: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>{item.code} {item.device_name}</Text>
          <Text style={{ color: COLORS.black, fontSize: 16, }}>FFR-SS-Input:{item.code}</Text>
        </View>
      </View>


      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.header}>Model Name</Text>
          <Text style={styles.header}>Model No.</Text>
          <Text style={styles.header}>Online</Text>
          <Text style={styles.header}>Staus</Text>
          <Text style={styles.header}>Direct Reading</Text>
          <Text style={styles.header}>Reading Time</Text>
          <Text style={styles.header}>Location</Text>
        </View>
        <View>
          <Text style={styles.content}>{item.device_name}</Text>
          <Text style={styles.content}>FFR-SS - {item.code}</Text>
          <Text style={styles.content}>True </Text>
          <Text style={styles.content}>{item.status}</Text>
          <Text style={styles.content}></Text>
          <Text style={styles.content}>2024-04-25T08:23:17.405Z</Text>
          <Text style={styles.content}>BLock 03 </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/planner-removebg.png")}
          style={{
            width: w / 1.1,
            height: h / 2.8,
            borderRadius: 2,
            backgroundColor: COLORS.lightWhite,
            resizeMode: "contain",
          }}
        />
      </View>

    </View>
    

    <View style={styles.historyheader}>
      <Text style={styles.headerText}>History</Text>
    </View>

  </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: COLORS.lightWhite,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 20,
  },
  content: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 25,
  },
  historyheader:{
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText:{
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default DeviceDetails;
