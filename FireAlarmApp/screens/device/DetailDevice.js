import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData, loadData, handleServerResponse } from "../../constants/AsyncModule";
const w = Dimensions.get('screen').width;;
const h = Dimensions.get('screen').height;

const DeviceDetails = ({ route }) => {

  const { item } = route.params;
  const [history, setHistory] = useState([]);
  const IPHOST = Constants.expoConfig.extra.IP_HOST;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const loginData = await loadData('loginData');
        const accessToken = loginData.metadata.tokens.accessToken;
        const userId = loginData.metadata.user._id;
        console.log("Access Token:", accessToken)
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
          "authorization": accessToken,
          "x-client-id": userId,
        };
        const response = await axios.get(`${IPHOST}/v1/api/sensors/${item.device_id}`, { headers });
        setHistory(response.data.metadata); // Adjust according to actual API response structure
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };
    fetchHistory();
  }, []);

  // sensorTypeImages 
  const sensorTypeImages = {
    "smoke": require("../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
    "heat": require("../../assets/images/heat_sensor.jpg"),
    "gas": require("../../assets/images/gas_sensor.jpg"),
    "flame": require("../../assets/images/Flame-Sensor-Detector.jpg"),
  };

  // Define a mapping between locations and floor plan images in normal state
  const locationImages_normal = {
    "Living Room": require("../../assets/images/planner_normal_living.png"),
    'Kitchen': require("../../assets/images/planner_normal_kitchen.png"),
    "Bedroom": require("../../assets/images/planner_normal_bedroom.png"),
    "Bathroom": require("../../assets/images/planner_normal_bathroom.png"),
    // Add more locations as needed
  };

  // Define a mapping between locations and floor plan images in alert state
  const locationImages_alert = {
    "Living Room": require("../../assets/images/Planner_Living_fire.png"),
    'Kitchen': require("../../assets/images/Planner_Kitchen_fire.png"),
    "Bedroom": require("../../assets/images/Planner_Bedroom_fire.png"),
    "Bathroom": require("../../assets/images/Planner_Bathroom_fire.png"),
  };

  const renderHistoryItem = ({ item, index }) => {
    return (
      <View style={styles.historyItem}>
        <Text style={styles.orderText}>{index + 1}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.historyTextCenter}>{moment(item.createdAt).format('DD MMMM YYYY, hh:mm a')}</Text>
          <Text style={styles.historyTextCenter}>{moment(item.createdAt).format('DD MMMM YYYY, hh:mm a')}</Text>
        </View>
        <Text style={styles.historyTextRight}>{item.status}</Text>
      </View>
    );
  };
  const mainImage = item.status === "Alarm"
    ? locationImages_alert[item.location]
    : locationImages_normal[item.location];

  return (
    <FlatList
      data={history}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <View>
          <View style={styles.container}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
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
                <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>
                  {item.model_code} {item.device_name}
                </Text>
                <Text style={{ color: COLORS.black, fontSize: 16 }}>
                  Honeywell BW-Input:{item.model_code}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.header}>Model Name</Text>
                <Text style={styles.header}>Model No.</Text>
                <Text style={styles.header}>Online</Text>
                <Text style={styles.header}>Status</Text>
                <Text style={styles.header}>Direct Reading</Text>
                <Text style={styles.header}>Reading Time</Text>
                <Text style={styles.header}>Location</Text>
              </View>
              <View>
                <Text style={styles.content}>{item.device_name}</Text>
                <Text style={styles.content}>FFR-SS - {item.model_code}</Text>
                <Text style={styles.content}>True</Text>
                <Text style={styles.content}>{item.status}</Text>
                <Text style={styles.content}></Text>
                <Text style={styles.content}>{moment(item.createdAt).format('DD MMMM YYYY, hh:mm a')}</Text>
                <Text style={styles.content}>{item.location}</Text>
              </View>
            </View>

            <View style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image
                source={mainImage}
                style={{
                  width: w / 1.1,
                  height: h / 2.8,
                  borderRadius: 2,
                  backgroundColor: COLORS.lightWhite,
                  resizeMode: "cover",
                }}
              />
            </View>

          </View>
          <View>
            <Text style={styles.headerText}>History</Text>
          </View>

        </View>
      )}

      renderItem={({ item, index }) => renderHistoryItem({ item, index })}
      showsVerticalScrollIndicator={false}

    />
  );

};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    paddingVertical: 5,
    backgroundColor: COLORS.lightWhite,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
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
  historyheader: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  historyItem: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,  // Add horizontal padding
    marginVertical: 8,
    marginHorizontal: 10,  // Add horizontal margin for spacing from screen edge
    width: w - 20,  // Adjust width based on the horizontal margins
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,  // Flex attribute for even spacing
    textAlign: 'left'  // Ensure text is aligned to the left
  },

  dateContainer: {
    flex: 2,  // Larger flex value since date might need more space
    alignItems: 'center'
  },

  historyTextCenter: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center'  // Center align the text within the date container
  },

  historyTextRight: {
    fontSize: 16,
    color: '#333',
    flex: 1,  // Flex attribute for even spacing
    textAlign: 'right'  // Ensure text is aligned to the right
  }

});

export default DeviceDetails;
