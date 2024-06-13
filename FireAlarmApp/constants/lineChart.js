
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MyLineChart = ({ dataPoints, labels }) => {
    return (
        <View style={styles.chartContainer}>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{
                        data: dataPoints
                    }]
                }}
                width={Dimensions.get('window').width - 30}
                height={Dimensions.get('window').height - 300}
                chartConfig={{
                    backgroundGradientFrom: '#f7f7f7',
                    backgroundGradientTo: '#f7f7f7',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(39, 212, 245, ${opacity})`, 
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
                    style: {
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#51C2D5', // Dot border color
                        fill: 'white' // Dot fill color
                    },
                    propsForBackgroundLines: {
                        stroke: '#CECECE' // Background lines color
                    }
                }}
                bezier
                style={{
                    borderRadius: 10,
                    // marginVertical: 10
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: '#fff', // Assuming your chart container needs a white background
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginVertical: 10,
        marginHorizontal: 15,
    }
});



export default MyLineChart;