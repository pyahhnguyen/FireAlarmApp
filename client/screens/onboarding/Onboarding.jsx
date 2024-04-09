import {StyleSheet, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Slides from '../../components/Onboard/Slides'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';


const Onboarding = () => {

    const navigation = useNavigation();
    // Trong Splash Screen hoặc màn hình đầu tiên được hiển thị
  //   useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  
  //       if (isLoggedIn && JSON.parse(isLoggedIn)) {
  //         // Người dùng đã đăng nhập, chuyển đến màn hình chính
  //         navigation.replace("Bottom");
  //       }
  //     } catch (err) {
  //       console.log("Error checking login status:", err);
  //     }
  //   };
  
  //   checkLoginStatus();
  // }, []);
  

    const slides = [
        {
            id:1,
            image: require('../../assets/images/department_safety.jpg'),
            title: "Safety is the number one priority",
        },
    ]


    return (
        <FlatList 
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={slides}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Slides item={item}/>}
        />
    )
}

export default Onboarding


const styles = StyleSheet.create({})