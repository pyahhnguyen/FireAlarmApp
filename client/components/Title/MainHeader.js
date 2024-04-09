import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES } from "../../constants/theme";
const MainHeader = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {/* <SimpleLineIcons onPress={() => {}} name="menu" size={20} color="gray" /> */}
      <Text style={styles.title}>{title}</Text>
      <Ionicons
        name="notifications"
        size={26}
        color="gray"
        onPress={() => {}}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  title: {
   
    fontFamily: "medium_poppins",
    fontSize: SIZES.eighteen,
    color: "black",
  },
});

export default MainHeader;
