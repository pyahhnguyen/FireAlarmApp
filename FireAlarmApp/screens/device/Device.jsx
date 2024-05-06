import React, { useState } from "react";
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

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const Device = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sensors, setSensors] = useState([]);
  const navigation = useNavigation();

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
            <Text style={styles.titleBold}>
              {item.device_name || "MQ2 Smoke Alarm"}
            </Text>
            <Text style={styles.titleItem}>
              Honeywell BW-Input: {item.code || "29352"}
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
          data={device_data}
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
