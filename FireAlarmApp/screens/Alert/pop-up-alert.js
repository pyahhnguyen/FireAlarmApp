import  React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import   Modal from "./Modal_alert";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

import alertHistory from "../../constants/dummy";
const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const Popup_alert = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedItemData, setSelectedItemData] = React.useState(alertHistory);
    const navigation = useNavigation();
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const handleDetail = () => {
        setIsModalVisible(false);
      navigation.navigate('Alert History');
    };
    

    return (
    <View >
            <StatusBar backgroundColor={"transparent"} />
    <Modal isVisible={isModalVisible} itemData={selectedItemData}>
    <Modal.Container>
    <Modal.ID title={` Detector #${selectedItemData.deviveId} `} />
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
}


export default Popup_alert

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
  