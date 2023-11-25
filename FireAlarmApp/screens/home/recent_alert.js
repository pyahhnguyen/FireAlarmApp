import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView

} from 'react-native';

import { COLORS, SIZES, FONTS } from '../../constants/theme';

const Transaction = ({customContainerStyle, history}) => {
    return (
        <View style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            padding: 20,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...customContainerStyle
        }}
        >
          <Text style={{ ...FONTS.h2 }}>Recent Alerts</Text>  
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Transaction;