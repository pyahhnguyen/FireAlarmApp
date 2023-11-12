import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import ReusableText from "../../components/Reusable/ReusableText";
import HeightSpace from "../../components/Reusable/HeightSpace";
import { COLORS, SIZES } from "../../constants/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReusableBtn from "../../components/Button/ReusableBtn";
import { useNavigation } from "@react-navigation/native";
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <Image
        source={require("../../assets/images/3d-render-fire-extinguisher-pastel-white-background.jpg")}
        style={{
          resizeMode: "cover",
          width: SIZES.width,
          height: SIZES.height,
        }}
      />
      <View
        style={{
          bottom: 0,
          position: "absolute",
          marginBottom: 60,
          marginHorizontal: 20,
        }}
      >
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
   
           
          
            <View>
              <ReusableBtn
                onPress={() => navigation.navigate("Login")}
                btnText={"Login"}
                width={SIZES.width - 50}
                backgroundColor={COLORS.black}
                borderColor={COLORS.black}
                borderWidth={0}
                textColor={COLORS.white}
                height={100}
              />

              <HeightSpace height={20} />

              <ReusableBtn
                onPress={() => navigation.navigate("Register")}
                btnText={"Register"}
                width={SIZES.width - 50}
                backgroundColor={COLORS.white}
                borderColor={COLORS.red}
                borderWidth={0}
                textColor={COLORS.black}
                height={100}
              />
               <HeightSpace height={20} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
