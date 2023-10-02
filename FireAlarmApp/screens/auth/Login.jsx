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




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 100, height: 80, marginTop: 80 }}
          source={require("../../assets/images/PayPal.png")}
        />
      </View>
      <HeightSpace height={50} />
      <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
        <ReusableText style={{flex:1,alignItems:"center"}}
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
            style={{marginLeft:10, width: 300, color: "gray", marginVertical: 10, fontSize: email ? 16:16 }}
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
            style={{ marginLeft:10 ,width: 300, color: "gray", marginVertical: 10, fontSize: password ? 16:16 }}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
        </View>
      </View>


      <HeightSpace height={20} />

      <View style={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
        <ReusableText 
          text={"Forgot Password?"}
          family={"medium"}
          size={SIZES.small}
          color={COLORS.black}
        />
        
      </View>


      <HeightSpace height={50} />

      <View>

      <ReusableBtn
        onPress={() => navigation.navigate("Bottom")}
        btnText={"Login"}
        width={SIZES.width - 50}
        backgroundColor={COLORS.red}
        borderColor={COLORS.red}
        borderWidth={0}
        textColor={COLORS.white}
      />
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  

  );
};
export default Login;

const styles = StyleSheet.create({});
