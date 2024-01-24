import { StyleSheet, Text, View, useState , Image, Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import SensorList from '../../../components/Sensor/SensorList'
import { SENSOR_LIST } from '../../../assets/data/room'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS,SIZES } from '../../../constants/theme';

const w = Dimensions.get("screen").width;
const h = Dimensions.get("screen").height;
const Living = () => {
    // const [sensors, setSensors] = useState(SENSOR_LIST);
    const renderItem = ({item, index }) => {
      return (
        <TouchableOpacity
        style={{
          marginVertical: 5,
          marginLeft: 25,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          overflow: "hidden",
          height: h/9,
          width : w - 50,
          position: 'relative'
          
      
        }}
        >
          <View style={[styles.card]}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/smoke.png")}
            />
         <View>
            <Text style={styles.titleItem}>Sensor #1</Text>
            <Text style={styles.titleItem}>Type: Smoke Detector</Text>
            <Text style={styles.titleItem}>Status: Normal </Text>
            <Text style={styles.titleItem}>Warning: 1</Text>
          </View>


          </View>
          
        </TouchableOpacity>
      );
    }



    return (
      <View >
        <View>
          <FlatList renderItem={renderItem} data={[1, 2, 3, 4]} />
        </View>
      </View>
    );
    };
 
    const styles = StyleSheet.create({
      container: {
        marginHorizontal: 10,
        marginVertical : 15,
        backgroundColor: COLORS.white,
        borderRadius: 10,

      },
      cardContainer:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: COLORS.,

      },
      card : {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        marginVertical: 10,
        // justifyContent: 'space-between',
        
      },
      image :{
        width: w/3.5,
        resizeMode: 'cover',
        height: w/3.5,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 20, 
        marginRight: 50,
        

      },
      shadow: {
        shadowColor: "#121211",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10.32,
        elevation: 8,
      },
   
    });
    
    export default Living;  