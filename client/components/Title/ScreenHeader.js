import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 
import WidthSpace from "../Reusable/WidthSpace";
import { Octicons } from '@expo/vector-icons'; 
import { SIZES } from "../../constants/theme";

const ScreenHeader = ({ mainTitle, secondTitle }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.mainTitle}>{mainTitle}</Text> */}
        {/* <View style={styles.location}>
        <EvilIcons name="location" size={18} color="gray" />

            <WidthSpace space={20} /> */}
            <Text style={styles.location}>Hi! Welcome back</Text>
        {/* </View> */}

    </View>
  );
};

const styles = StyleSheet.create({

    container: {
       
        justifyContent: "space-between",
        paddingHorizontal: 25,
        marginVertical : 50,
        // marginTop: 10,
       
    
    },
        
    mainTitle: {
        fontSize: 22,
        fontWeight: "medium",
        fontFamily: "medium",
        color:"gray"
    },
   
    location: {
        flexDirection: "row",
        alignItems: "center",
        color:"black",
        fontFamily: "regular",
        fontSize: SIZES.medium,
       
    },

    
});

export default ScreenHeader;
