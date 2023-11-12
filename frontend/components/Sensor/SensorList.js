import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, SHADOWS, spacing } from "../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const CARD_WIDTH = SIZES.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 175;

const SensorList = ({ list }) => {
  return (
    <View style={styles.container}>
      {list.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardContainer}>
          <View style={[styles.card, SHADOWS.small]}>
            <View style={styles.imageBox}>
              <Image style={styles.image} source={item.image} />
            </View>
            <View style={styles.footer}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.data}>{item.data}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
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

  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 45,
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 45,
    resizeMode: "cover",
  },
  footer: {

    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,

  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: CARD_WIDTH - 40,
  
  },
  title: {
    marginVertical: 4,
    fontSize: 18,
    fontWeight: 'medium',
    color: COLORS.gray,
   
  },
  data: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
    
  },
});

export default SensorList;
