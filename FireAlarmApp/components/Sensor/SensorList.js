import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, SHADOWS, spacing } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";    


const CARD_WIDTH = SIZES.width / 2 - (spacing.l + spacing.l / 2);
;
const CARD_HEIGHT = 200;


const SensorList = ({ list }) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
         <TouchableOpacity style={styles.cardContainer}>
             <View  style={[styles.card, SHADOWS.medium]} key={item.id}>
            <View style={styles.imageBox}>
              <Image style={styles.image} source={item.image} />
            </View>
          </View>
         </TouchableOpacity>
        );
      })}
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      cardContainer: {
        marginLeft: spacing.l,
        marginBottom: spacing.l,
      },
      card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
      },
      cardContainer: {
        marginLeft: spacing.l,
        marginBottom: spacing.l,
      },
      imageBox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        overflow: 'hidden',
      },
      image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode: 'cover',
      },

});




export default SensorList;