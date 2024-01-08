import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const h = Dimensions.get('screen').height;


const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [userLogin, setLogin] = useState(true);
 


 async function getData() {
    const token = await AsyncStorage.getItem('authToken');
    console.log(token);
    axios
      .post('http://10.0.238.60:3056/userdata', {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
     
      });
  }

  useEffect(() => {
    getData();
  }, []);


  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <View style={{ width: "100%" }}>
        <ImageBackground
          source={require("../../assets/images/profile_background.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
            height: 300,
          }}
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
        ></ImageBackground>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.profile}
        />
        <Text style={styles.name}>
        {userLogin === true ? (userData ? userData.name : "Please login") : ""}
        </Text>
        {userLogin === false ? (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>L O G I N </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <Text style={styles.menuText}>{userData.email}</Text>
          </View>
        )}

        {userLogin === false ? (
          <View></View>
        ) : (
          
          <View style={styles.menuWapper}>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Detail information</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Favorites</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign name="API" size={24} color="black" />
                <Text style={styles.menuText}>Sensor</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="cached"
                  size={24}
                  color={COLORS.primary}
                />
                <Text style={styles.menuText}>Clear cache</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign name="deleteuser" size={24} color={COLORS.primary} />
                <Text style={styles.menuText}>Delete Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign name="logout" color={COLORS.primary} size={24} />
                <Text style={styles.menuText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
   
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    marginTop: h-(h-300),
    flex: 1,
    alignItems: "center",
  },
  profile: {
    height: 130,
    width: 130,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -90,
  },
  name: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
  },
  menuText: {
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 20,
    fontSize: 14, // Adjusted this line to set font size
    lineHeight: 26,
  },

  menuWapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});
