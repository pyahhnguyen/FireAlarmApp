import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "../../constants/theme";
import uuid from "react-native-uuid"; // Import uuid library
import { useNavigation } from "@react-navigation/native";
const AlertScreen = () => {
  const [myAlert, setMyAlert] = useState("");
  const [alertList, setAlertList] = useState([]);
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Detail Alert', { item }); // Pass item data to details screen
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}
    >
      <View style={styles.card}>
        <Text style={{ fontSize:18, color: COLORS.primary, padding:5 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => onDeleteItem(item.title)}>
          <Text style={{ fontSize: 18, color: COLORS.lightBlue, padding:5, backgroundColor:COLORS.lightWhite}}>Clear</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
    );
  };

  const onDeleteItem = (title) => {
    const filterData = alertList.filter((item) => item.title !== title);
    setAlertList(filterData);
  };

  const onAddAlert = () => {
    var myNewAlert = {
      id: uuid.v4(), // Use uuid.v4() to generate UUID
      title: myAlert,
      details: "Demo details",
    };
    setAlertList([myNewAlert, ...alertList]);
    setMyAlert("");
  };

  return (
    <View>
      <StatusBar backgroundColor="transparent" />

      <TextInput
        value={myAlert}
        keyboardType="default"
        placeholder="Enter Alert"
        style={styles.input}
        onChangeText={(value) => {
          setMyAlert(value);
        }}
      />
      <TouchableOpacity
        style={styles.submit}
        onPress={() => onAddAlert()}
        underlayColor= {COLORS.primary}
      >
        <Text style={styles.addalertText}>Add Alert</Text>
      </TouchableOpacity>

      <FlatList
        data={alertList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor:COLORS.primary,
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
    flexDirection: "row",
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
});
