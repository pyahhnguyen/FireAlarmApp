import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Logout, login } from "../../redux/actions/action";
import { useDispatch } from "react-redux";

h = Dimensions.get("screen").height;
const Profile = () => {
  const [userData, setUserData] = useState("");
  const [userLogin, setLogin] = useState(true);
  const navigation = useNavigation();
  const apiUrl = Constants.expoConfig.extra.IP_HOST;
  const dispatch = useDispatch();
  async function getData() {
    try {
      const Logindata = await AsyncStorage.getItem("loginData");
      if (Logindata) {
        const loginData = JSON.parse(Logindata);
        if (
          loginData.metadata &&
          loginData.metadata.tokens &&
          loginData.metadata.user
        ) {
          const userdata = loginData.metadata;
          setUserData(userdata);
        } else {
          console.error(
            "Login data does not contain tokens property:",
            loginData
          );
        }
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const logout = async () => {
    try {
      const Logindata = await AsyncStorage.getItem("loginData");
      if (Logindata) {
        const loginData = JSON.parse(Logindata);
        if (
          loginData.metadata &&
          loginData.metadata.tokens &&
          loginData.metadata.user
        ) {
          const refreshToken = loginData.metadata.tokens.refreshToken;
          const accessToken = loginData.metadata.tokens.accessToken;
          const userId = loginData.metadata.user._id; 

          dispatch(Logout(userId, accessToken));
        } else {
          console.error(
            "Login data does not contain tokens property:",
            loginData
          );
        }
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"transparent"} />
      <View style={{ width: "100%" }}>
        <ImageBackground
          source={require("../../assets/images/map.png")}
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
          {userLogin === true
            ? userData
              ? userData.user.name
              : "Please login"
            : ""}
        </Text>
        {userLogin === false ? (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.loginBtn}>
            <Text style={styles.menuText}>{userData? userData.user.email: null}</Text>
          </View>
        )}

        {userLogin === false ? (
          <View></View>
        ) : (
          <View style={styles.menuWapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailProfile", { UserData: userData })
              }
            >
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
    marginTop: h - (h - 300),
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
    padding: 5,
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
