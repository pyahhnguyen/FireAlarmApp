import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React ,{useState, useEffect}from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {alertHistory} from "../../constants/dummy";
import axios from "axios";
import Constants from 'expo-constants';



const Alert = ({ route}) => {
  const { sensorData } = route.params || { sensorData: null };
  const defaultSensorData = sensorData || alertHistory[0];
  const w = Dimensions.get('screen').width;;
  const h = Dimensions.get('screen').height;
  const [recentalert, setRecentAlert] = React.useState()
  const [refreshing, setRefreshing] = useState(false);
  const [firstAlarmItem, setFirstAlarmItem] = useState(null);
  const apiHost = Constants.manifest.extra.API_HOST || 'localhost'
  
  const fetchData = async () => {
    try {
      setRefreshing(true); // Set refreshing to true while fetching
      const response = await axios.get(`http://${apiHost}:3050/api/alert`, {
        headers: {
          'userId': '659a4e55b88b9369f584b308', // Replace with your actual header
        },
      });
      const data = response.data;
      // Convert the JSON data to an array of sensor items
      const sensorArray = Object.values(data);
      // Sort the array based on the triggerAt field in descending order
      sensorArray.sort((a, b) => new Date(b.triggerAt) - new Date(a.triggerAt));
      // Add a deviceId field based on the array index
      sensorArray.forEach((sensor, index) => {
          sensor.deviceId = `${index + 1}`;
      });
      const firstAlarmItem = sensorArray.find(sensor => sensor.status === "Alarm");
      console.log('First Alarm:', firstAlarmItem);
      setFirstAlarmItem(firstAlarmItem);

      // First Alarm: {"Code": "SD-001", "Location": "LivingRoom", "ModelNo": "SD-001", "deviceData": 0, "deviceDescription": "Smoke detector in the living room", "deviceId": "2", "deviceType": "Smoke Detector", "location": "Living Room", "name": "Smoke Detector 1", "resolveAt": "2024-01-15T19:23:17.405Z", "status": "Alarm", "triggerAt": "2024-01-15T19:23:17.405Z"}
      
      setRecentAlert(data);
      // console.log('Retrieved recent data:', sensorArray);
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setRefreshing(false); // Set refreshing back to false after fetching
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);
  // // truyen data đi sensorData = history
  // const [detailSensor, setDetailSensor] = React.useState(sensorData);

  const navigation = useNavigation();

    handleDevice = () => {
      navigation.navigate('Location', { detailSensor: sensorData } );
    };

// Define a mapping between sensor types and images


const sensorTypeImages = {
  "Smoke Detector": require("../../assets/images/Smoke-Alarms-Smoke-Detectors.jpg"),
  "Heat Detector": require("../../assets/images/heat_sensor.jpg"),
  "gas Detector": require("../../assets/images/gas_sensor.jpg"),
  "Flame Detector": require("../../assets/images/Flame-Sensor-Detector.jpg"),
  // Add more types as needed
};

// Select the image based on the sensor type
// const sensorImage = sensorTypeImages[sensorData && sensorData.deviceType ? sensorData.deviceType : defaultSensorData.deviceType];
const sensorImage = sensorTypeImages[sensorData && sensorData.deviceType ? sensorData.deviceType :
    (firstAlarmItem && firstAlarmItem.deviceType) ? firstAlarmItem.deviceType : defaultSensorData.deviceType];


// Define a mapping between locations and floor plan images
const locationImages = {
  "Living Room": require("../../assets/images/Planner_Living_fire.png"),
  'Kitchen': require("../../assets/images/Planner_Kitchen_fire.png"),
  "Bed Room": require("../../assets/images/Planner_Bedroom_fire.png"),
  "Bath Room": require("../../assets/images/Planner_Bathroom_fire.png"),
  // Add more locations as needed
};

// Select the image based on the location
const locationImage = locationImages[sensorData && sensorData.location? sensorData.location : 
    (firstAlarmItem && firstAlarmItem.location) ? firstAlarmItem.location :
    defaultSensorData.location];


  return (
    <View
      style={{
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.alert,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        marginBottom: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={sensorImage}
          resizeMode="center"
          style={{
            width: 55,
            height: 55,
            marginLeft: SIZES.radius, 
            backgroundColor: COLORS.lightWhite,
            borderRadius: 5,
          }}
        />

        <View style={{ flex: 1, marginLeft: SIZES.radius, marginBottom: 15 }}>
          <Text style={{ color: COLORS.black, fontSize: 16, fontWeight:'bold' }}>{sensorData && sensorData.name? sensorData.name : (firstAlarmItem && firstAlarmItem.name) ? firstAlarmItem.name :defaultSensorData.name}</Text>
          <Text style={{ color: COLORS.black,  fontSize: 16 }}>
            {sensorData && sensorData.triggerAt? sensorData.triggerAt : (firstAlarmItem && firstAlarmItem.triggerAt) ? firstAlarmItem.triggerAt :defaultSensorData.triggerAt}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            alignItems: "center",
            marginRight: 20,
            marginTop: 15,
          }}
        >
          <Text
            style={{ color: COLORS.black, ...FONTS.h4, marginBottom: 20 }}
          >
            {sensorData && sensorData.status? sensorData.status : (firstAlarmItem && firstAlarmItem.status) ? firstAlarmItem.status : defaultSensorData.status}
          </Text>
          <Text style={{ color: COLORS.black, ...FONTS.h4, marginTop: 5 }}>
            Set
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.header}>Model No.</Text>
          <Text style={styles.header}>Code.</Text>
        </View>
        <View>
          <Text style={styles.content}>{sensorData && sensorData.ModelNo? sensorData.ModelNo : (firstAlarmItem && firstAlarmItem.ModelNo) ? firstAlarmItem.ModelNo : defaultSensorData.ModelNo}</Text>
          <Text style={styles.content}>{sensorData && sensorData.Code? sensorData.Code : (firstAlarmItem && firstAlarmItem.Code) ? firstAlarmItem.Code : defaultSensorData.Code}</Text>
        </View>
      </View>



      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: h/45,
        }}
      >
        <TouchableOpacity
          style={{
            width: w - 40,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            height: h/15,
          }}
        >
          <Text style={styles.btnText}>Emerency Call(114)</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: h / 25,
        
        }}
      >
        <Image
          source={locationImage}
          
          style={{
            width: w - 40,
            height: h/2.8,
            borderRadius: 2,
            backgroundColor: COLORS.lightWhite,
            
            
          }}    
        />
      </View>


      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: h/43,
        }}
      >

        <TouchableOpacity
          style={{
            width: w - 250,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3,
            borderColor: COLORS.primary,
            borderWidth: 0.3,
            height: h/25,
          }}

          onPress={handleDevice}
        >
          <Text style={styles.btnText1}>View Device</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: SIZES.radius,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 60,
  },
  btnText: {
    color: COLORS.alert,
    fontSize: SIZES.medium,
    fontFamily: "medium_poppins",
  },
  btnText1: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: "medium_poppins",
  },

 
});

export default Alert;
