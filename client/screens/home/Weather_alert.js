import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SIZES, COLORS, SHADOWS, FONTS } from "../../constants/theme";
import axios from "axios";

const WeatherAlert = () => {
  const [weatherData, setWeatherData] = useState(null);
  const cityId = 1566083;
  const apiKey = '7176d45e38810cbad34e3f2040b636b8';
  
  const fetchData = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // If there's an error, set default data
      setWeatherData({
        name: 'Ho Chi Minh City',
        sys: { country: 'VN' },
        wind: { speed: 1.12 },
        main: { humidity: 45, temp: 29 },
      });
    }
  };

  useEffect(() => {
      // Fetch weather data when the component mounts
    fetchData();
    // Set up interval to fetch data every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData) {
    return null;
  }

  const { main, wind, name, sys } = weatherData;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...styles.shadow,
      }}
    >
      <Image
        source={require("../../assets/images/cloudy-day.png")}
        resizeMode="cover"
        style={{
          width: 35,
          height: 35,
        }}
      />

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h5 }}>{name}</Text>
        <Text style={{ ...FONTS.body5 }}>{sys.country}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3 }}>{wind?.speed || '1.12'}</Text>
          <Text style={{ ...FONTS.h5 }}>m/s</Text>
        </View>
        <Text style={{ ...FONTS.body5 }}>Wind</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3 }}>{main?.humidity || '45'}</Text>
          <Text style={{ ...FONTS.body4 }}>%</Text>
        </View>
        <Text style={{ ...FONTS.body5 }}>Hum</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...FONTS.h2 }}>{main?.temp || '29'}</Text>
        <Text style={{ ...FONTS.body4 }}>°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default WeatherAlert;
