import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList, 
  
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import {alertHistory} from "../../constants/dummy";


import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler"; 

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const Location = ({ route }) => {

const { detailSensor } = route.params || { detailSensor: null };

const defaultDetailData = detailSensor || alertHistory[0];

// Define a mapping between locations and floor plan images
const locationImages = {
  "Living Room": require("../../assets/images/Planner_Living_fire.png"),
  'Kitchen': require("../../assets/images/Planner_Kitchen_fire.png"),
  "Bed Room": require("../../assets/images/Planner_Bedroom_fire.png"),
  "Bath Room": require("../../assets/images/Planner_Bathroom_fire.png"),
  // Add more locations as needed
};

// Select the image based on the location
const locationImage = locationImages[detailSensor && detailSensor.location ? detailSensor.location : defaultDetailData.location];

  const renderItem = ({ item, index }) => {
    return (
      
      <TouchableOpacity
        style={{
          
          borderRadius: 5,
          backgroundColor: COLORS.alert,
          ...styles.shadow,
          overflow: "hidden",
          height: h / 9,
          width: w - 40,
          marginVertical: 5,
          
        }}
      >
        <View style={[styles.card]}>
          <Image
            style={styles.image}
            source={require("../../assets/images/Co2.png")}
          />
          <View>
            <Text style={styles.titleIte_header}>Sensor #1</Text>
            <Text style={styles.titleItem}>Type: Smoke Detector</Text>
            <Text style={styles.titleItem}>Location: Living</Text>
            <Text style={styles.titleItem}>Status: Alarm </Text>
            <Text style={styles.titleItem}>Warning: 0 </Text>
          </View>
        </View>
      </TouchableOpacity>
      
    );
  };


  return (
    <View>
        <View
          style={{
            backgroundColor: COLORS.lightWhite,
            marginHorizontal: 10,
            borderRadius: 10,
            marginVertical: 10,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <View>
              <Text style={styles.header}>Name.</Text>
              <Text style={styles.header}>Location Code.</Text>
            </View>
            <View>
              <Text style={styles.content}>{detailSensor && detailSensor.location ? detailSensor.location : defaultDetailData.location}</Text>
              <Text style={styles.content}>{detailSensor && detailSensor.location ? detailSensor.location : defaultDetailData.location}</Text>
            </View>

            <View style={styles.icon}>
              <FontAwesome name="pencil-square-o" size={24} color="black" />
            </View>
          </View>

          <View>
            <Text style={styles.header}>Floor Plan.</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              marginBottom: 50,

              resizeMode: "cover",
            }}
          >
            <Image
              source={locationImage}
              style={{
                width: w - 40,
                height: h / 3.3,
                borderRadius: 2,
                backgroundColor: COLORS.lightWhite,
              }}
            />
          </View>
        </View>

{/* // Device List  */}
      <View
          style={{
            flexDirection: "column", // row
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            marginBottom: 50,
          }}
        >
          <View>
            <Text style={styles.device_header}>Devices</Text>
          </View>
          <View style={{ backgroundColor: "transparent" }}>

            <FlatList // sửa lại data input 
            renderItem={renderItem} 

            data={[1, 2, 3]}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            />

          </View>
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
    color: COLORS.primary,
  },

  device_header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: SIZES.radius,
    color: COLORS.primary,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
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
  icon: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 100,
  },
  titleItem: {
    fontSize: 13,
    color: COLORS.black,
  },
  titleIte_header: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  card: {
    backgroundColor: COLORS.alert,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    marginVertical: 5,
    // justifyContent: 'space-between',
  },
  image: {
    width: w / 5.5,
    resizeMode: "center",
    height: w / 5.5,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    
  },
});

export default Location;
