import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionic from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const EditProfile = ({ route }) => {
  const { UserData } = route.params;
  const navigation = useNavigation();
  const apiHost = Constants.manifest.extra.API_HOST || "localhost";

  // State variables to hold updated information

  const [name, setName] = useState(UserData.name);
  const [email, setEmail] = useState(UserData.email);
  const [phone, setPhone] = useState(UserData.phone);
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [apartmentFloor, setApartmentFloor] = useState("");

  const ToastMessage = () => {
    ToastAndroid.show(
      "Edited Sucessfully! Please login again!!",
      ToastAndroid.SHORT
    );
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://${apiHost}:3056/editprofile`, {
        userId: UserData._id, // Assuming UserData has _id property
        name: name,
        phone: phone,
        buildingName: buildingName,
        buildingAddress: address, // Assuming address is the buildingId
        apartmentNo: apartmentNumber,
        apartmentFloor: apartmentFloor,
      });
      console.log(response.data); // Handle the response data accordingly
      // After a successful update, you can show a success message
      ToastMessage();
      // Navigate back after updating
      navigation.navigate("Login");
    } catch (error) {
      console.error(error); // Handle errors
    }
  };

  return (
    <SafeAreaView>
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
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close-outline" style={{ fontSize: 35 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              ToastMessage();
              navigation.goBack();
              handleUpdateProfile();
            }}
          >
            <Ionic
              name="checkmark"
              style={{ fontSize: 35, color: "#3493D9" }}
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
              defaultValue={UserData.name}
              // value={name}
              onChangeText={(text) => setName(text)}
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
              // value={email}
              // onChangeText={(text) => setEmail(text)}
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
              // value='phone'
              onChangeText={(text) => setPhone(text)}
              defaultValue={UserData.phone}
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
              // value='buildingName'
              onChangeText={(text) => setBuildingName(text)}
              // defaultValue={UserData.email}
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
              // value='address'
              onChangeText={(text) => setAddress(text)}
              // defaultValue={UserData.email}
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
              // value='apartmentNumber'
              onChangeText={(text) => setApartmentNumber(text)}
              // defaultValue={UserData.email}
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
              // value='apartmentFloor'
              onChangeText={(text) => setApartmentFloor(text)}
              // defaultValue={UserData.email}
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
