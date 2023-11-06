import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setLogin] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.lightWhite} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../../assets/images/profile_background.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true ? "Phu Gia" : "Please login"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>phugiazx44@gmail.com</Text>
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
                  <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color={COLORS.primary}
                  />
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
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    height: 300,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
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
    fontWeight: 14,
    fontSize: 14,
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
