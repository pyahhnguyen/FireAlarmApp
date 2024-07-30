
import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const DetailProfile = ({route}) => {
  const { UserData } = route.params;
  const navigation = useNavigation();
  // console.log("userid", UserData.user._id)
  const [userData, setUserData] = useState(null);
  const apiUrl = Constants.expoConfig.extra.IP_HOST;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
          "authorization": UserData.tokens.accessToken,
          "x-client-id": UserData.user._id,
        };
        const response = await axios.get(`${apiUrl}/v1/api/user/data`, { headers });
        setUserData(response.data); 
        // console.log('userdata:', response.data);
      } catch (error) {
        console.error('Failed to userdata:', error);
      } 
    };
    fetchUserData();
  }, []);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"transparent"} />
      {/* <Text>{userData ? JSON.stringify(userData) : 'No user data available'}</Text> */}
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detail Profile</Text>
        </View>

        {/* Profile Photo */}
        <View style={styles.profilePhotoContainer}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.profilePhoto}
          />
        </View>

        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoText}>{userData?.metadata?.name }</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{UserData.user.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoText}>
                    {userData?.metadata?.phone ?? '0919229544'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Building Name</Text>
            <Text style={styles.infoText}>
            {userData?.metadata?.apartments?.slice(-1)[0]?.buildingName ?? 'Centec Tower Building'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Building Address</Text>
            <Text style={styles.infoText}>
                {userData?.metadata?.apartments?.slice(-1)[0]?.buildingAddress ?? 'No. 72-74, Nguyen Thi Minh Khai Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City, Vietnam'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Apartment Number</Text>
            <Text style={styles.infoText}>
                {userData?.metadata?.apartments?.slice(-1)[0]?.apartmentNo ?? 'A202'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Apartment Floor</Text>
            <Text style={styles.infoText}>
            {userData?.metadata?.apartments?.slice(-1)[0]?.floor ?? '3'}
            </Text>
            </View>

        </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile", {UserData: UserData})}
       
      >
      <View>
        <Text
          style={{
            marginVertical: 10,
            padding: 10,
            color: '#3493D9',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
          }}>
            Edit Infomation
        </Text>
      
      </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default DetailProfile;

const styles = {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 40,
    },
    backIcon: {
      fontSize: 30,
      marginRight: 10,
      marginLeft: 10,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 110,
    },
    profilePhotoContainer: {
      alignItems: 'center',
      padding: 20,
    },
    profilePhoto: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: '#3493D9',
    },
    userInfoContainer: {
      padding: 10,
    },
    infoContainer: {
      paddingVertical: 10,
    },
    infoLabel: {
      opacity: 0.5,
    },
    infoText: {
      fontSize: 16,
      borderBottomWidth: 1,
      borderColor: '#CDCDCD',
    },
    editButton: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#3493D9',
      alignItems: 'center',
      borderRadius: 5,
    },
    editButtonText: {
      color: 'white',
    },
  };