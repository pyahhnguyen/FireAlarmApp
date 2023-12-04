import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PopUp,
  Button,
} from "react-native";
import React, { useState } from "react";

import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { FlatList } from "react-native-gesture-handler";
import Modal from "../Alert/Modal_alert";

const AlertHistory = ({ customContainerStyle, history }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
          {item.description}
        </Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.date}</Text>
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
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.gray,
              }}
            />
          );
        }}
      />

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="LogRocket is fab!" />
          <Modal.Body>
            <Text>Agree to continue with this guide</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button title="I agree" onPress={handleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
};

export default AlertHistory;
