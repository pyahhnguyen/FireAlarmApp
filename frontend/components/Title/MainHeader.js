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
        name="notifications-outline"
        size={24}
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
    
  },
  title: {
   
    fontSize: 22,
    fontWeight: "medium",
    fontFamily: "medium",
    color:"gray"
  },
});

export default MainHeader;
