import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  TextInput
} from "react-native";
import React, { useState } from "react";
import ReusableText from "../../components/Reusable/ReusableText";
import WidthSpace from "../../components/Reusable/WidthSpace";
import HeightSpace from "../../components/Reusable/HeightSpace";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ReusableBtn from "../../components/Button/ReusableBtn";
import Octicons from "react-native-vector-icons/Octicons";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const apiHost = Constants.expoConfig.extra.API_HOST || 'localhost'

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      phone: phone, // Add the phone field here
    };

    const headers = {
      "Content-Type": "application/json",
      "x-api-key":
        "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
    };

    // send a post request to the backend to register the user
    axios
      .post(`http://${apiHost}:3056/v1/api/user/signup`, user, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successful",
          "You have registered successfully. Please login to continue"
        );

        navigation.navigate("Login");
        setName("");
        setEmail("");
        setPassword("");
        setPhone(""); // Clear the phone field after registration
      })
      .catch((err) => {
        Alert.alert(
          "Registration Failed",
          "An error occurred while registering. Please try again"
        );
        console.log("Registration failed", err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
            text={"Register to your Account"}
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
            <Octicons
              style={{ marginLeft: 10 }}
              name="person"
              size={26}
              color="gray"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                marginLeft: 10,
                width: 300,
                color: "gray",
                marginVertical: 10,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your name"
            />
          </View>
        </View>

        <HeightSpace height={30} />

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
        <HeightSpace height={30} />

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
              name="local-phone"
              size={24}
              color="gray"
            />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={{
                marginLeft: 10,
                width: 300,
                color: "gray",
                marginVertical: 10,
                fontSize: phone ? 16 : 16,
              }}
              placeholder="Enter your phone number"
            />
          </View>
        </View>

        <HeightSpace height={30} />

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
            family={"medium"}
            size={SIZES.small}
            color={COLORS.black}
          />
        </View>

        <HeightSpace height={30} />

        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
          <ReusableBtn
            onPress={handleRegister}
            btnText={"Register"}
            width={SIZES.width - 150}
            backgroundColor={COLORS.primary}
            borderColor={COLORS.primary}
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
                text={"Already have account?"}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </Pressable>
            <WidthSpace width={5} />
            <Pressable onPress={() => navigation.goBack()}>
              <ReusableText
                text={"Login Now"}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.red}
              />
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
