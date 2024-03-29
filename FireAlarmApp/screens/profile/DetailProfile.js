

import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const DetailProfile = ({route}) => {
  const { UserData } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
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
            <Text style={styles.infoText}>{UserData.name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{UserData.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoText}>
                {UserData.phone ? UserData.phone : '0919229544'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Building Name</Text>
            <Text style={styles.infoText}>
                {UserData.buildingName ? UserData.buildingName : 'Centec Tower Building'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Building Address</Text>
            <Text style={styles.infoText}>
                {UserData.buildingAddress ? UserData.buildingAddress : 'No. 72-74, Nguyen Thi Minh Khai Street, Vo Thi Sau Ward, District 3, Ho Chi Minh City, Vietnam'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Apartment Number</Text>
            <Text style={styles.infoText}>
                {UserData.apartmentNumber ? UserData.apartmentNumber : 'A202'}
            </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Apartment Floor</Text>
            <Text style={styles.infoText}>
                {UserData.apartmentFloor ? UserData.apartmentFloor : '3'}
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
      padding: 10,
    },
    backIcon: {
      fontSize: 30,
      marginRight: 10,
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