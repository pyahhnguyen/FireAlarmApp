import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Touchable,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { COLORS,SHADOWS, SIZES, spacing } from "../../constants/theme";

const CARD_WIDTH = SIZES.width - 200;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const Room = ({ list_room }) => {
  return (
    <FlatList 
      data={list_room}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginRight: index === list_room.length - 1 ? spacing.l : 0,
            }}
          >
            <View style={[styles.card, SHADOWS.medium]}>
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>

              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                </View>


            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },

  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,

    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: "cover",
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 50,
    right: 16,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Room;
