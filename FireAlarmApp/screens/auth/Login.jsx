import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ReusableText from "../../components/Reusable/ReusableText";
import WidthSpace from "../../components/Reusable/WidthSpace";
import HeightSpace from "../../components/Reusable/HeightSpace";
import { COLORS, SIZES } from "../../constants/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReusableBtn from "../../components/Button/ReusableBtn";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/action';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state mới để lưu trữ thông báo lỗi
  const navigation = useNavigation();


  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password, 
    };
    dispatch(login(user));
    // navigation.replace("BottomTabs");  
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar backgroundColor={"transparent"} />
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            marginTop: 60,
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={require("../../assets/images/firefighter.png")}
        />
      </View>
      <HeightSpace height={30} />
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <ReusableText
            style={{ flex: 1, alignItems: "center" }}
            text={"Login to your Account"}
            family={"bold"}
            size={SIZES.large}
            color={COLORS.black}
          />
        </View>

        <HeightSpace height={50} />

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#CDCFCE",
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 10 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                marginLeft: 10,
                width: 300,
                color: "gray",
                marginVertical: 10,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your email"
            />
          </View>
        </View>

        <HeightSpace height={40} />

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#CDCFCE",
              paddingVertical: 5,
              borderRadius: 5,
              marginHorizontal: 20,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                marginLeft: 10,
                width: 300,
                color: "gray",
                marginVertical: 10,
                fontSize: password ? 16 : 16,
              }}
              secureTextEntry={true}
              placeholder="Enter your password"
            />
          </View>
        </View>

        <HeightSpace height={20} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <ReusableText
            text={"Forgot Password?"}
            family={"medium"} // Assuming this is a custom prop for font family
            size={SIZES.small}
            color={COLORS.black}
          />
          {error ? (
            <Text
              style={{
                color: COLORS.red,
                fontSize: SIZES.h4, // Adjusted from size to fontSize
              }}
            >
              {error}
            </Text>
          ) : null}
        </View>

        <HeightSpace height={30} />

        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <ReusableBtn
            onPress={handleLogin}
            btnText={"Login"}
            width={SIZES.width - 150}
            backgroundColor={COLORS.primary}
            borderColor={COLORS.red}
            borderWidth={0}
            textColor={COLORS.white}
            alignItems="center"
            justifyContent="center"
          />
        </View>

        <HeightSpace height={30} />
        <Pressable style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Pressable>
              <ReusableText
                text={"Don't have an account?"}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </Pressable>
            <WidthSpace width={5} />
            <Pressable onPress={() => navigation.navigate("Register")}>
              <ReusableText
                text={"Sign Up"}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.red}
              />
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({});
