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
import Constants from 'expo-constants';
const h = Dimensions.get('screen').height;

const Profile = () => {
  const [userData, setUserData] = useState('');
  const [userLogin, setLogin] = useState(true);
  const apiHost = Constants.manifest.extra.API_HOST || 'localhost';
  const navigation = useNavigation();
 
  async function getData() {
    try {
      const userdata = await AsyncStorage.getItem('userdata');
        // console.log('userdata:', JSON.parse(userdata));
      if (userdata) {
        setUserData(JSON.parse(userdata));
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
  }

  
  //   async function getData() {
  //   try {
  //     const x_client_id = await AsyncStorage.getItem('x_client_id');
           
  //     if (x_client_id) {
  //       axios.post(`http://${apiHost}:3056/v1/user/userdata`, { x_client_id })
  //         .then(res => {
  //           console.log(res.data); // Log kết quả trả về từ API để kiểm tra
            
  //           if (res.data && res.data.data && res.data.data.email) {
  //             // Kiểm tra và log dữ liệu email
  //             console.log('Email:', res.data.data.email);
  
  //             // Cập nhật state
  //             setUserData(res.data.data);
  //           } else {
  //             console.error('Email not found in API response');
  //           }
  //         })
  //         .catch(error => {
  //           console.error('Error fetching user data:', error);
  //         });
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving token from AsyncStorage:', error);  
  //   }
  // }
    useEffect(() => {
       getData();
    }, []);

    const logout = async () => {
      try {
        // Retrieve values from AsyncStorage
        const accessToken = await AsyncStorage.getItem('authAccessToken');
        const x_client_id = await AsyncStorage.getItem('x_client_id');
    
        // Check if the access token is present
        if (!accessToken) {
          console.error("Access token not found. User may not be logged in.");
          return;
        }
        // Construct headers dynamically using retrieved values
        const headers = {
          'Content-Type': 'application/json',
          'x-api-key': '2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b',
          'authorization': accessToken,
          'x-client-id': x_client_id
        };
    
        // Make the request with error handling
        axios
          .post(`http://${apiHost}:3056/v1/api/user/logout`, {}, { headers })
          .then(response => {
            console.log('Logout Response:', response.data);
            // Handle successful logout
          })
          .catch(error => {
            console.error('Logout Error:', error);
    
            // Implement more specific error handling based on error types and response status codes
            if (error.response && error.response.status === 404) {
              console.error('404: Not Found. Check API endpoint or server availability.');
            } else if (error.response) {
              console.error('API Error:', error.response.data, error.response.status);
            } else {
              console.error('Network Error:', error);
            }
          });
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
      clearAuthToken();
    };
  
  const clearAuthToken = async () => {

    await AsyncStorage.setItem("isLoggedIn", JSON.stringify(false));
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

            <TouchableOpacity onPress={() => navigation.navigate('DetailProfile', {UserData: userData})}>

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
