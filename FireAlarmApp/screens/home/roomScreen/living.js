// import { View, Text, useState , ScrollView} from 'react-native'
// import React from 'react'
// import SensorList from '../../../components/Sensor/SensorList'



// const Living = () => {

//     const [sensors, setSensors] = useState([
//         {
//           id: 5,
//           image: require("../../../assets/images/Co2.png"),
//           title: "CO2",
//           data: "300",
//           description:
//             "The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more",
//         },
//         {
//           id: 6,
//           image: require("../../../assets/images/smoke.png"),
//           title: "Smoke",
//           data: "1243",
//           description:
//             "Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain",
//         },
//         {
//           id: 7,
//           image: require("../../../assets/images/humiditypng.png"),
//           title: "Temp",
//           data: "32",
//           description:
//             "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
//         },
//         {
//           id: 8,
//           image: require("../../../assets/images/temperature.png"),
//           title: "Humidity",
//           data: "87",
//           description:
//             "Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture",
//         },
//         {
//           id: 9,
//           image: require("../../../assets/images/kitchen.jpg"),
//           title: "Kitchen",
//           location: "Japan",
//           description:
//             "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
//         },
//         {
//           id: 10,
//           image: require("../../../assets/images/bathroom.jpg"),
//           title: "Bathroom",
//           location: "France",
//           description:
//             "Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture",
//         },
//       ]);
//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//     <View>
//        {sensors.length > 0 ? (
//           <SensorList list={sensors} />
//         ) : (
//           <ActivityIndicator size="large" color={COLORS.primary} />
//         )}
//     </View>
//     </ScrollView>
//   )
// }

// export default Living


import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

export default function TabOneScreen() {

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Button title="button" onPress={handleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={handleModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});