
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants/theme";


const ReusableBtn = ({onPress, btnText, textColor, width, backgroundColor, borderWidth, borderColor, borderRadius}) => {
    return (
       <TouchableOpacity  onPress={onPress} style={styles.btnStyle(width, backgroundColor, borderWidth, borderColor)}>

        <Text style={styles.btnText(textColor)}>{btnText}</Text>

        </TouchableOpacity>

    );
};


export default ReusableBtn;

const styles = StyleSheet.create({
    btnText:  (textColor) => ({
        color: textColor,
        fontSize: SIZES.medium,
        fontFamily: "medium_poppins",
    }), 

    btnStyle: (width, backgroundColor, borderWidth, borderColor) => ({
        width: width,
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: SIZES.small,
        borderColor : borderColor,
        borderWidth: borderWidth,
        borderRadius: 10,

    })
});