import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 
import WidthSpace from "../Reusable/WidthSpace";
import { Octicons } from '@expo/vector-icons'; 

const ScreenHeader = ({ mainTitle, secondTitle }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.mainTitle}>{mainTitle}</Text> */}
        <View style={styles.location}>
        <EvilIcons name="location" size={18} color="gray" />

            <WidthSpace space={20} />
            <Text style={styles.location}>Di An, Binh Duong</Text>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({

    container: {
       
        justifyContent: "space-between",
        paddingHorizontal: 25,
        // marginTop: 10,
        marginBottom:30
    
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
        color:"gray"
       
    },

    
});

export default ScreenHeader;
