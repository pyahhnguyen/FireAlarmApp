import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SIZES, COLORS, SHADOWS, spacing, FONTS } from "../../constants/theme";

import { Ionicons } from "@expo/vector-icons";
const WeatherAlert = ({ customContainerStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...customContainerStyle,
        ...styles.shadow,
       
      }}
    >
      <Image
        source={require("../../assets/images/cloudy-day.png")}
        resizeMode="cover"
        style={{
          width: 35,
          height: 35,
        }}
      />

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h4 }}>Thu Duc</Text>
        <Text style={{ ...FONTS.body5 }}>Ho Chi Minh</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3 }}>16</Text>
          <Text style={{ ...FONTS.body4 }}>km/h</Text>
        </View>
      
        <Text style={{ ...FONTS.body5 }}>Wind</Text>
      </View>
      
      <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3 }}>90</Text>
          <Text style={{ ...FONTS.body4 }}>%</Text>
        </View>
        <Text style={{ ...FONTS.body5 }}>Hum</Text>
      </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...FONTS.h2 }}>25</Text>
          <Text style={{ ...FONTS.body4 }}>°C</Text>
        </View>
      
       
     
    </View>
  );
};
const styles = StyleSheet.create({
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

export default WeatherAlert;
