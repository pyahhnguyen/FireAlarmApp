import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SENSOR_LIST } from "../../assets/data/room";
import ReusableBtn from "../../components/Button/ReusableBtn";



const Alert = () => {

    const w = Dimensions.get('screen').width;
    const h = Dimensions.get('screen').height;
  return (
    <View
      style={{
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.alert,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/Co2.png")}
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
          <Text style={{ color: COLORS.black, fontSize: 16, fontWeight:'bold' }}>Device#1</Text>
          <Text style={{ color: COLORS.black,  fontSize: 16 }}>
            2023-12-23, 23:06pm
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
            Alarm
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
          <Text style={styles.content}>SW-GS529N</Text>
          <Text style={styles.content}>SW-13</Text>
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
          source={require("../../assets/images/planner.png")}
          
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
