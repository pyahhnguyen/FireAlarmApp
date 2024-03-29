import React , {useEffect, useState}from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
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
import axios from "axios";
const tabs = ["Status", "News"];
const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const TabHome = () => {
  const [selected, setSelected] = React.useState(0);

  const [alertHistory, setAlertHistory] = React.useState(dummyData.alertHistory);
  const [recentalert, setRecentAlert] = React.useState()
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation(); 
  // ignore error  below 

  // const fetchData = async () => {
  //   try {
  //     setRefreshing(true); // Set refreshing to true while fetching
  //     const response = await axios.get('http://10.0.239.105:3050/api/alert', {
  //       headers: {
  //         'userId': '659a4e55b88b9369f584b308', // Replace with your actual header
  //       },
  //     });
  //    const data = response.data;
  //     // Convert the JSON data to an array of sensor items
  //     const sensorArray = Object.values(data);
  //     // Sort the array based on the triggerAt field in descending order
  //     sensorArray.sort((a, b) => new Date(b.triggerAt) - new Date(a.triggerAt));
  //     // Add a deviceId field based on the array index
  //     sensorArray.forEach((sensor, index) => {
  //         sensor.deviceId = `${index + 1}`;
  //     });
      
  //     setRecentAlert(data);
  //     console.log('Retrieved recent data:', sensorArray);
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   } finally {
  //     setRefreshing(false); // Set refreshing back to false after fetching
  //   }
  // };


  // useEffect(() => {
  //   fetchData();
  // }, []);
 


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
      value: 8,
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
        {/* tab menu */}
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
