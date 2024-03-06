import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Room from "../../components/Room/Room";
import { ROOM_LIST } from "../../assets/data/room";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import WeatherAlert from "../../screens/home/Weather_alert";
import TabHome from "./TabHome";

import { useNavigation } from "@react-navigation/native";

const Home = () => {
 
  const [rooms, setRooms] = useState(ROOM_LIST);
  const w = Dimensions.get('screen').width;
  const h = Dimensions.get('screen').height;
  const navigation = useNavigation();
 
  function renderHeader() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          width: (w - 15*2)/2,
          height: 140,
          paddingBottom: 20,
          marginLeft: index === 0 ? SIZES.xSmall : 0,
          marginRight: SIZES.xSmall,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          // ...styles.shadow,
          overflow: "hidden",
        }}
        onPress={() => {
          navigation.navigate(item.screen); // Navigate to the specified screen
        }}
    
      >
        {/* Image */}

        <Image
          source={item.image}
          resizeMode="cover"
          style={{
            borderRadius: 10,
            width: "100%",
            height: "100%",
            opacity: 0.8,
          }}
        ></Image>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
    return (
     
      <View
        style={{
          width: "100%",
          height: h /3.2,
          ...styles.shadow,
        }}
      >
        <ImageBackground
          source={require("../../assets/images/51c2d5.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: 50,
              width: "100%",
              alignItems: "flex-end",
              paddingHorizontal: 30,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                flex: 1,
                fontFamily: "medium_poppins",
                fontSize: SIZES.eighteen,
              }}
            >
              Hi, Welcome back!
            </Text>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                ...styles.shadow,
              }}
              onPress={() => console.log("Notification on clicked")}
            >
              <Ionicons
                name="notifications"
                size={24}
                color={COLORS.primary}
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/* Weather */}
           <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
           >
            <WeatherAlert />
          </View>
          {/* Rooms */}
          <View
            style={{
              position: "absolute",
              bottom: "-30%",
            }}
          >
            <Text
              style={{
                marginLeft: SIZES.padding,
                paddingTop: SIZES.padding,
                color: COLORS.primary,
                fontFamily: "medium_poppins",
                fontSize: SIZES.medium,
                marginTop: 20,
              }}
            >
              Rooms
            </Text>

            <FlatList
              contentContainerStyle={{
                marginTop: SIZES.base,
                paddingBottom: SIZES.xSmall,
               
                
              }}
              data={rooms}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
   
    );
  }
 
  function renderTabHome() {
    return (
      <TabHome />
    )
  }
  return (
    // <View style= {styles.SafeAreaView}>
    <View style={styles.container} >
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        {renderTabHome()}
        </View >   
        
     {/* </View> */}
    
    </View>
  );

  // // Find the latest temperature data
  // const latestTemperatureData = sensorData
  //   .filter((item) => item.data.type === 'temperature')
  //   .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  // return (
  //   <View style={styles.container}>
  //     <MainHeader title="Hi, Welcome back!" />
  //     {/* <ScreenHeader /> */}
  //     <ScrollView showsVerticalScrollIndicator={false}>
  //       <Text style={styles.textStyle}>Rooms</Text>
  //       <Room list_room={ROOM_LIST} />
  //       <SectionHeader title="News" />
  //       <SectionHeader title="Devices" />
  //       {sensors.length > 0 ? (
  //         <SensorList list={sensors} />
  //       ) : (
  //         <ActivityIndicator size="large" color={COLORS.primary} />
  //       )}
  //     </ScrollView>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    
    // backgroundColor: COLORS.red,
  },
  container: {
    flex: 1,
  },

  textStyle: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    paddingHorizontal: 25,
    color: COLORS.dark,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "medium",
    color: COLORS.primary,  
    fontFamily: "medium",
    justifyContent: "center",
    textAlign: "center",
  },
});
export default Home;
