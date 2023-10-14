import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ReusableText from "../../components/Reusable/ReusableText";
import WidthSpace from "../../components/Reusable/WidthSpace";
import HeightSpace from "../../components/Reusable/HeightSpace";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import ReusableBtn from "../../components/Button/ReusableBtn";
import Octicons from "react-native-vector-icons/Octicons";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    // send a post request to the backend to register the user
    axios
      .post("http://192.168.1.232:3056/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Sucessful",
          "You have registered successfully. Please login to continue"
        );

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        Alert.alert(
          "Registration Failed",
          "an error occured while registering. Please try again"
        );
        console.log("registration failed", err);
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
            onPress={handleRegister}
            btnText={"Register"}
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
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
 
});
