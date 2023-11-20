import {StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Slides from '../../components/Onboard/Slides'

const Onboarding = () => {

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