import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import MainHeader from "../../components/Title/MainHeader";
import ScreenHeader from "../../components/Title/ScreenHeader";
import Room from "../../components/Room/Room";
import { ScrollView } from "react-native-gesture-handler";
import { ROOM_LIST, SENSOR_LIST } from "../../assets/data/room";
import SectionHeader from "../../components/Title/SectionHeader";
import SensorList from "../../components/Sensor/SensorList";
const Home = () => {
  return (
    <View style={styles.container}>
      <MainHeader title="Welcome back" />
      <ScreenHeader/>
      <ScrollView  showsVerticalScrollIndicator={false}>

        <Text style={styles.textStyle}>Rooms</Text>
        <Room list_room={ROOM_LIST}   />
        <SectionHeader
          title="Sensors"
          //   buttonTitle="See all"
          //   onPress={() => {}}
        />
        <SensorList list={SENSOR_LIST} />
        </ScrollView>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // content: {
  //   flex: 1,
  
  // },
  textStyle: {
    fontSize: SIZES.xLarge,
    paddingHorizontal: 25,
  },
});
export default Home;
