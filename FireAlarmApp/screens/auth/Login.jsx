import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import ReusableText from "../../components/Reusable/ReusableText";
import WidthSpace from "../../components/Reusable/WidthSpace";
import HeightSpace from "../../components/Reusable/HeightSpace";
import { COLORS, SIZES } from "../../constants/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReusableBtn from "../../components/Button/ReusableBtn";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  

  // useEffect(() => {
  //   const checkLoginstatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (token) {
  //         navigation.replace("Bottom");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkLoginstatus();
  // }, []);


  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.1.90:3056/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Bottom");
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Invalid email");
        console.log(err);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 100, height: 100, marginTop: 60 }}
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
            onPress={handleLogin}
            btnText={"Login"}
            width={SIZES.width - 150}
            backgroundColor={COLORS.red}
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
