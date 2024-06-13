import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {React, useState} from 'react'
import { LineChart } from 'react-native-chart-kit'; // Import the LineChart component
import  MyLineChart from '../../../constants/lineChart'; // Import the LineChart component

const Living_Device = ({item}) => { 
    const {params} = route;
    const device = params.item;

    const [chartData, setChartData] = useState({
        labels: ["January", "February", "March", "April", "May", "June",], // This will hold timestamps
        dataPoints: [20, 45, 28, 80, 99, 43,20, 45, 28, 80, 99, 43] // This will hold device values
    });
    return (
        <View>
        <Text> Realtime device chart </Text>
        <MyLineChart
            dataPoints={chartData.dataPoints}
            labels={chartData.labels}
        />
        </View>
    )
}
export default Living_Device

const styles = StyleSheet.create({})