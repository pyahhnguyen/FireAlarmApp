import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../../constants/theme";
import uuid from "react-native-uuid"; // Import uuid library
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { alertlist } from "../../constants/alertlist";
import moment from "moment";

const AlertScreen = () => {
  const [myAlert, setMyAlert] = useState("");
  const [alertList, setAlertList] = useState(alertlist[0]); // Access the inner array
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("Detail Alert", { item }); // Pass item data to details screen
  };
   // Set handler for background notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  // Define a function to uppercase the first letter of a string
  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", JSON.stringify(notification));
        const remoteMessage = notification.request.trigger.remoteMessage;
        if (remoteMessage && remoteMessage.data) {
          console.log("Custom Notification Data:", remoteMessage.data);
          setNotification(remoteMessage.data);
        }
        // Create a new alert item from notification data
        const newAlert = {
          id: uuid.v4(), // Generate a unique ID for the new alert
          alertType: capitalizeFirstLetter(remoteMessage.data.type),
          location: remoteMessage.data.location,
          address: remoteMessage.data.address,
          severity: 'High - Immediate action required!',
          deviceName: remoteMessage.data.deviceName,
          deviceModel: remoteMessage.data.model_code,
          deviceId: remoteMessage.data.deviceId,
          timeOfAlert: remoteMessage.data.timestamp,
        };
        // Add the new alert to the top of the list
        setAlertList((prevAlerts) => [newAlert, ...prevAlerts]);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "Notification Response Received:",
          JSON.stringify(response)
        );
        const remoteMessage =
          response.notification.request.trigger.remoteMessage;
        if (remoteMessage && remoteMessage.data) {
          console.log(
            "Custom Notification Data on Response:",
            remoteMessage.data
          );
          setNotification(remoteMessage.data);
          // Create a new alert item from notification data
          const newAlert = {
              id: uuid.v4(), // Generate a unique ID for the new alert
              alertType: capitalizeFirstLetter(remoteMessage.data.type),
              location: remoteMessage.data.location,
              address: remoteMessage.data.address,
              severity: 'High - Immediate action required!',
              deviceName: remoteMessage.data.deviceName,
              deviceModel: remoteMessage.data.model_code,
              deviceId: remoteMessage.data.deviceId,
              timeOfAlert: remoteMessage.data.timestamp,
          };
          // Add the new alert to the top of the list
          setAlertList((prevAlerts) => [newAlert, ...prevAlerts]);
        }
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // item content
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => handlePress(item)}
        style={{
          marginVertical: 8,
          marginHorizontal: 12,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}
      >
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/flame-icon.png")}
            />
            <Text
              style={{ fontSize: 18, color: COLORS.primary, marginLeft: 10 }}
            >
              {item.alertType} Alert
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: COLORS.darkgray}}>
            {item.location} - {item.address}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.red }}>
            {item.severity}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.darkgray }}>
            {item.deviceName} (Model:{item.deviceModel}, ID: {item.deviceId})
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.darkgray }}>
            Timestamp: {moment(item.timeOfAlert).format('DD MMMM YYYY, hh:mm:ss a')}
          </Text>
          <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.lightBlue,
                padding: 5,
                backgroundColor: COLORS.white,
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const onDeleteItem = (id) => {
    const filterData = alertList.filter((item) => item.id !== id);
    setAlertList(filterData);
  };
  return (
    <View>
      <StatusBar backgroundColor="transparent" />
      <FlatList
        data={alertList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
      />
    </View>
  );
};
export default AlertScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    borderRadius: 5,
  },
  submit: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginHorizontal: 100,
    borderRadius: 5,
  },
  addalertText: {
    color: COLORS.white,
    textAlign: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    // backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    backgroundColor: COLORS.lightWhite,
    borderRadius: 5,
  },
});