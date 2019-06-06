import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};

const API_WEATHER = 'http://10.0.2.2:8080/weather-crawler/current-weathers/by-city-name';

export default class WeatherDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    fetch(API_WEATHER + '/' + `${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <Text>데이터를 불러오는 중입니다.</Text>
          </View>
        </PaperProvider>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let weatherDesc = this.state.weather[0].description;
    let windSpeed = this.state.wind.speed;
    let cloudDegree = this.state.clouds.all;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;

    return (
      <View style={styles.container}>
        <Text>temp: {celsius.toFixed(1)}</Text>
        <Text>wind speed: {windSpeed} m/s</Text>
        <Text>weatherMain: {weatherMain}</Text>
        <Text>weatherDesc: {weatherDesc}</Text>
        <Text>cloudDegree: {cloudDegree}</Text>
        <Text>barometric pressure: {pressure} hPa</Text>
        <Text>humidity: {humidity} %</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
