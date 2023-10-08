import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants/theme";
import MainHeader from "../../components/Title/MainHeader";
import ScreenHeader from "../../components/Title/ScreenHeader";
import Room from "../../components/Room/Room";
import { ScrollView } from "react-native-gesture-handler";
import { ROOM_LIST } from "../../assets/data/room";
const Home = () => {

  return (
    <View style={styles.container}>
      <MainHeader title="Fire Alarm App" />
      <ScreenHeader mainTitle="Welcome back" />
      <ScrollView showsVerticalScrollIndicator = {false}>
        <Room list_room={ROOM_LIST} />
     </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Home;
