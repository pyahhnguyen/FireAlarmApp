import {StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Slides from '../../components/Onboard/Slides'

const Onboarding = () => {

    const slides = [
        {
            id:1,
            image: require('../../assets/images/1.png'),
            title: "Safety is the number one priority",
        },

        
    //    {
    //         id:2,
    //         image: require('../../assets/images/3.png'),
    //         title: "Find the perfect place to stay",
    //    }
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