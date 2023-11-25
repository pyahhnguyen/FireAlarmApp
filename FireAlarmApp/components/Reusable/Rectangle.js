import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
// import LinearGradient from "react-native-linear-gradient";

const WeatherWidget = () => {
  	
  	return (
        <View style={[styles.weatherWidget1, { backgroundColor: '#985ee1' }]}>
        <View style={styles.frameChildPosition}>
          {/* The rest of your code remains unchanged */}
        </View>
      			<View style={[styles.degre, styles.degrePosition]}>
        				<Text style={[styles.text1, styles.text1Typo]}>-10°</Text>
        				<Text style={[styles.h2L12, styles.h2L12Typo]}>H:2°  L:12°</Text>
      			</View>
      			<View style={[styles.content, styles.contentLayout]}>
        				<Text style={[styles.myLocationMontrealContainer, styles.partlyCloudyFlexBox]}>
          					<Text style={[styles.myLocation, styles.text1Typo]}>{`My Location
`}</Text>
                    <Text style={[styles.montreal, styles.h2L12Typo]}>Montreal</Text>
                </Text>
                <View style={[styles.partlyCloudyWrapper, styles.contentLayout]}>
                    <Text style={[styles.partlyCloudy, styles.partlyCloudyFlexBox]}>
                        <Text style={styles.text2}></Text>
                        <Text style={styles.partlyCloudy1}> Partly Cloudy</Text>
                    </Text>
                </View>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    frameChildPosition: {
        width: 329,
        left: 0,
        top: 0,
        position: "absolute",
        height: 106
    },
    degrePosition: {
        top: 0,
        height: 106
    },
    text1Typo: {
        fontFamily: "SF Pro Display",
        letterSpacing: 0,
        color: "#fff"
    },
    h2L12Typo: {
        fontFamily: "SF Pro Text",
        lineHeight: 18,
        fontSize: 13,
        letterSpacing: 0
    },
    contentLayout: {
        width: 195,
        position: "absolute"
    },
    partlyCloudyFlexBox: {
        textAlign: "left",
        position: "absolute"
    },
    frameChild: {
        borderRadius: 22,
        backgroundColor: "transparent"
    },
    text1: {
        fontSize: 48,
        lineHeight: 41,
        fontWeight: "300",
        textAlign: "right",
        color: "#fff"
    },
    h2L12: {
        marginTop: 24,
        color: "rgba(235, 235, 245, 0.6)",
        textAlign: "right"
    },
    degre: {
        left: 209,
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: "absolute",
        top: 0
    },
    myLocation: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: "700",
        color: "#fff"
    },
    montreal: {
        color: "rgba(235, 235, 245, 0.6)"
    },
    myLocationMontrealContainer: {
        top: 6,
        left: 1
    },
    text2: {
        color: "#fff"
    },
    partlyCloudy1: {
        color: "rgba(235, 235, 245, 0.6)"
    },
    partlyCloudy: {
        top: 5,
        fontFamily: "SF Pro Text",
        lineHeight: 18,
        fontSize: 13,
        letterSpacing: 0,
        left: 0
    },
    partlyCloudyWrapper: {
        top: 71,
        height: 25,
        left: 0
    },
    content: {
        left: 15,
        top: 0,
        height: 106
    },
    weatherWidget1: {
        flex: 1,
        width: "100%",
        height: 106
    }
});

export default WeatherWidget;
