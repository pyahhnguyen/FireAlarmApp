import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";

import Ionic from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
// import {IPHOST,PORT_EX} from "@env"

const EditProfile = ({ route }) => {
  const { UserData } = route.params;
  const navigation = useNavigation();
  // State variables to hold updated information
  const [name, setName] = useState("");
  const [email, setEmail] = useState(UserData.user.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [apartmentFloor, setApartmentFloor] = useState("");
  console.log("UserData", UserData.tokens.accessToken);
  const ToastMessage = () => {
    ToastAndroid.show(
      "Edited Sucessfully! Please login again!!",
      ToastAndroid.SHORT
    );
  };
  const apiUrl = Constants.expoConfig.extra.IP_HOST;
  const handleUpdateProfile = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": "2a06fcd170406face25783da33f0d105b8f312a7ddfdfb14d98121daa275e22328c9d9ebd3b146d650a168499f7265d862618e3c3809906d0ecfc71d598e947b",
        "authorization": UserData.tokens.accessToken,
        "x-client-id": UserData.user._id,
      };
      const body = {
        name: name,
        phone: phone,
        buildingName: buildingName,
        buildingAddress: address,
        apartmentFloor: apartmentFloor,
        apartmentNo: apartmentNumber
      };
      const response = await axios.put(`${apiUrl}/v1/api/user/updateUserdata`, body, {headers});
      console.log(response.data);
      if (response.status === 200) {
        ToastMessage(); // Show success message only if update is successful
      } else {
        console.log('Update failed with status:', response.status); // Log non-success status
      }
    } catch (error) {
      console.error('Failed to update user data:', error); // Handle errors more specifically if needed
    }
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"transparent"} />
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close-outline" style={{ fontSize: 35, marginLeft:10 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              handleUpdateProfile();
              navigation.goBack();
            }}
          >
            <Ionic
              name="checkmark"
              style={{ fontSize: 35, color: "#3493D9", marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/user.png")}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            Change profile photo
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
            Name
            </Text>
            <TextInput
              placeholder="name"
              onChangeText={(text) => setName(text)}
              value={name}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="email"
              defaultValue={email}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Phone
            </Text>
            <TextInput
              placeholder="phonenumber"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Building Name
            </Text>
            <TextInput
              placeholder="building name"
              onChangeText={(text) => setBuildingName(text)}
              value={buildingName}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Building Address
            </Text>
            <TextInput
              placeholder="address"
              onChangeText={(text) => setAddress(text)}
              value={address}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Apartment Number
            </Text>
            <TextInput
              placeholder="apartment number"
              onChangeText={(text) => setApartmentNumber(text)}
              value={apartmentNumber}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              Apartment Floor
            </Text>
            <TextInput
              placeholder="apartment floor"
              onChangeText={(text) => setApartmentFloor(text)}
              value={apartmentFloor}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
