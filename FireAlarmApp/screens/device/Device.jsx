import {
  StyleSheet,
  Text,
  View,
  useState,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  FlatList
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import axios from "axios";

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;
const Device = () => {
  // const [sensors, setSensors] = useState(SENSOR_LIST);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
          marginLeft: 25,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          height: h / 9,
          width: w - 50,
          position: "relative",
        }}
      >
        <View style={[styles.card]}>
          <Image
            style={styles.image}
            source={require("../../assets/images/Co2.png")}
          />
          <View>
            <Text style={styles.titleItem}>Sensor #1</Text>
            <Text style={styles.titleItem}>Type: Smoke Detector</Text>
            <Text style={styles.titleItem}>Location:</Text>
            <Text style={styles.titleItem}>Status: </Text>
            <Text style={styles.titleItem}>Warning: </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Device</Text>
      </TouchableOpacity>
      <View>
        <FlatList renderItem={renderItem} data={[1, 2, 3]} />
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
    flexDirection: "row",
    marginVertical: 10,
    // justifyContent: 'space-between',
  },
  image: {
    width: w / 4,
    resizeMode: "contain",
    height: w / 4,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 40,
  },
  shadow: {
    shadowColor: "#121211",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10.32,
    elevation: 8,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 15,
    alignSelf: "center",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  titleItem: {
    fontSize: 12,
  },
});

export default Device;
