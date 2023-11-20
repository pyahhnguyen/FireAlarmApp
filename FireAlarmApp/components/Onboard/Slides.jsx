import { View , Text, StyleSheet , Image } from "react-native";
import React from 'react'
import styles from "./slide_styles";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import ReusableBtn from "../Button/ReusableBtn";
import HeightSpace from "../Reusable/HeightSpace";
import { useNavigation } from "@react-navigation/native";

const Slides = ({ item }) => {

    const navigation = useNavigation();
    return (
        <View>
           <Image source={item.image} style={styles.image} />
         
            <View style={styles.stack}>
               
                <ReusableText 
                    text={item.title}
                    family={"regular"}
                    size={SIZES.medium}
                    color={COLORS.secondary}
                />
                <HeightSpace height={15 } />
                <ReusableBtn 
                    onPress={() => navigation.navigate('Welcome')}
                    btnText={"Let's go"}
                    width={(SIZES.width-50) /2.2}
                    backgroundColor={COLORS.red}
                    borderColor={COLORS.white}
                    borderWidth={0}
                    textColor={COLORS.white}
                />

               
            </View>
        </View>
    );

};

export default Slides;