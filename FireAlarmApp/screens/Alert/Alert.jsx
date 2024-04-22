import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Alert = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is an empty screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the view expand to fill the entire screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#f9f9f9', // Sets the background color of the view
  },
  text: {
    fontSize: 20, // Sets the font size of the text
    color: '#333333', // Sets the text color
  }
});

export default Alert;
