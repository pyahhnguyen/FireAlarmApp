import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  useState,
  Dimensions,
  LogBox,
} from "react-native";
import { COLORS } from "../../constants/theme";
import WeatherAlert from "./Weather_alert";
import { ScrollView } from 'react-native-virtualized-view'

import AlertHistory from "./alert_history";
import dummyData, {
  alertHistory,
  transactionHistory,
} from "../../constants/dummy";
import { SIZES, FONTS } from "../../constants/theme";
import Donut from "./donut_screen";
import { useNavigation } from "@react-navigation/native";

const tabs = ["Status", "News"];
const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const TabHome = () => {
  const [selected, setSelected] = React.useState(0);
  const [alertHistory, setAlertHistory] = React.useState(
    dummyData.transactionHistory
  );

  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const renderContent = () => {
    switch (tabs[selected]) {
      case "Status":
        return <StatusContent />;
      case "News":
        return <NewsContent />;
      default:
        return null; // Handle other cases as needed
    }
  };

  const data_chart = [
    {
      value: 5,
      color: "#188527",
    },
    {
      value: 10,
      color: "#fc1717",
    },
  ];

  function renderChart() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Recent Alerts</Text> */}
        <Donut data={data_chart} />
      </View>
    );
  }

  function renderAlertHistory() {
    return <AlertHistory customContainerStyle={{}} history={alertHistory} />;
  }

  const StatusContent = () => (
    <ScrollView>
      <View style={{ marginBottom: 250, flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            marginVertical: SIZES.fourteen,
          }}
        >
          {renderChart()}
        </View>

        <Text
          style={{
            marginLeft: SIZES.padding,
            color: COLORS.black,
            fontFamily: "medium_poppins",
            fontSize: SIZES.medium,
          }}
        >
          Recent Alerts
        </Text>
        {renderAlertHistory()}
      </View>
    </ScrollView>
  );



  const NewsContent = () => (
    <View style={{ marginTop: 20, marginBottom: 280 }}>
      <AlertHistory customContainerStyle={{}} history={alertHistory} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {tabs.map((e, i) => (
          <Pressable key={i} onPress={() => setSelected(i)}>
            <Text
              style={[styles.title, selected == i && { color: COLORS.primary }]}
            >
              {e}
            </Text>
            {selected == i && <View style={styles.line} />}
          </Pressable>
        ))}
      </View>
      {/* Render content based on the selected tab */}
      {renderContent()}
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "transparent",
  },
  container_device: {
    // backgroundColor: COLORS.lightWhite,
    height: 300,
    width: w - 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 100,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    marginTop: 3,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
