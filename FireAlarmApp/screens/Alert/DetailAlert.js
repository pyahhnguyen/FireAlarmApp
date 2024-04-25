import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const DetailAlert = ({route}) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>

            <Text>{item.data}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Change this to change the background color

    },
});

export default DetailAlert;
