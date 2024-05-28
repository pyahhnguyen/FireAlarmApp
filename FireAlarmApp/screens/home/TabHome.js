import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  LogBox,
} from "react-native";
import { COLORS } from "../../constants/theme";
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
import Constants from 'expo-constants';
import { loadData } from "../../constants/AsyncModule";
import adaptApiDataToAlertHistoryFormat from "../../constants/AdaptApidatasensor";
import { useSelector } from 'react-redux';


const tabs = ["Status", "News"];
const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;

const TabHome = () => {
  const [selected, setSelected] = React.useState(0);
  const [alertHistory, setAlertHistory] = React.useState(dummyData.alertHistory);
  const [recentalert, setRecentAlert] = React.useState()
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const IPHOST = Constants.expoConfig.extra.IP_HOST;

  const alertCount = useSelector(state => state.sensors.alertCount);
  const normalCount = useSelector(state => state.sensors.normalCount);
  

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const loginData = await loadData('loginData');
        const accessToken = loginData.metadata.tokens.accessToken;
        const userId = loginData.metadata.user._id;

        const headers = {
          "Content-Type": "application/json",
          "x-api-key": "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
          "authorization": accessToken,
          "x-client-id": userId,
        };
        const response = await axios.get(`http://${IPHOST}:3056/v1/api/sensors/user/recentAlert`, { headers });
        if (response.data && response.data.metadata) {
          const adaptedData = adaptApiDataToAlertHistoryFormat(response.data.metadata);
          setAlertHistory(adaptedData);
        }

      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };
    fetchHistory();
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
    { value: alertCount, color: 'red' },
    { value: normalCount, color: 'green' },
    // ... other data entries
  ];

  function renderChart() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',  // Thêm thuộc tính flexDirection để sắp xếp theo chiều ngang
        }}
      >
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ color: COLORS.green, }}>Normal: {data_chart[1].value} </Text>
        </View>
        <Donut data={data_chart} />
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ color: COLORS.red }}>Alert:  {data_chart[0].value} </Text>
        </View>
      </View>
    );

  }

  function renderAlertHistory() {

    return <AlertHistory customContainerStyle={{}} history={alertHistory} />;
  }

  const StatusContent = () => (
    <ScrollView>
      <View style={{ marginBottom: 180, flex: 1 }}>
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
    marginTop: 90,
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
