import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PopUp,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { FlatList } from "react-native-gesture-handler";
import Modal from "../Alert/Modal_alert";
import { useNavigation } from "@react-navigation/native";
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;



const AlertHistory = ({ customContainerStyle, history }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedItemData, setSelectedItemData] = React.useState(history);

  const handleModal = (item) => {
    setSelectedItemData(item);
    setIsModalVisible(!isModalVisible);
  };


  const navigation = useNavigation();


  const handleDetail = () => {
    setIsModalVisible(false);
  navigation.navigate('Alert', { sensorData: selectedItemData });
};



const renderItem = ({ item }) => (
  <TouchableOpacity
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: SIZES.base,
    }}
    onPress={() => handleModal(item)}
  >
    <Image
      source={require("../../assets/images/fireicon-remove.png")}
      style={{
        width: 30,
        height: 30,
        opacity: 0.8,
      }}
    />

    <View style={{ flex: 1, marginLeft: SIZES.radius }}>
      <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
        {item.deviceDescription}
      </Text>
      <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.triggerAt}</Text>
    </View>

    <View
      style={{
        height: "100%",
        alignItems: "center",
        marginRight: 40,
        marginTop: 15,
      }}
    >
      <Text style={{ color: "#fc1717", ...FONTS.body3 }}>{item.status}</Text>
    </View>
  </TouchableOpacity>
);

  
  
  return (
    <View
      style={{
        // marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
    >
          <FlatList
        contentContainerStyle={{}}
        scrollEnabled={true}
        data={history}
        keyExtractor={(item) => `${item.deviceId}`}  // Update to deviveId
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ () => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.gray,
              }}
            />
          );
        }
        
        }
      />



      <Modal isVisible={isModalVisible} itemData={selectedItemData}>
        <Modal.Container>
        <Modal.ID title={` Detector #${selectedItemData.deviceId} `} />
        <Modal.Header title={selectedItemData.deviceDescription ? selectedItemData.deviceDescription.toUpperCase() : ''} />
          <Modal.Body>
            <Image
              source={require("../../assets/images/emergency_alarm.png")}
              resizeMode="contain"
              style={{
                width: 180,
                height: 160,
                borderRadius: 2,
                backgroundColor: COLORS.white,
                marginLeft: 80,
              }}
            />
          </Modal.Body>

          <Modal.Footer>
            <View

              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: h / 40,
              }}
            >
              <TouchableOpacity
                style={{
                  width: w - 100,
                  backgroundColor: COLORS.alert,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                  borderRadius: 1,
                  borderColor: COLORS.primary,
                  borderWidth: 0.3,
                  height: h / 22,
                }}
              >

                <Text style={styles.btnText1}>Emergency Call (114)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: w - 100,
                  backgroundColor: COLORS.background,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  marginBottom: 15,
                  borderColor: COLORS.primary,
                  borderWidth: 0.3,
                  height: h / 25,
                }}
                onPress={handleDetail}
              >

                <Text style={styles.btnText2}>View Detail</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: w - 100,
                  backgroundColor: COLORS.background,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  marginBottom: 15,
                  borderColor: COLORS.primary,
                  borderWidth: 0.3,
                  height: h / 25,
                }}
                onPress={handleModal}
              >

                <Text style={styles.btnText2}>Close</Text>
              </TouchableOpacity>
              
            </View>

          

          </Modal.Footer>


        </Modal.Container>
      </Modal>
    </View>
  );
};

export default AlertHistory;

const styles = StyleSheet.create({
  btnText1: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: "medium_poppins",
  },

  btnText2: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontFamily: "medium_poppins",
  },
});
