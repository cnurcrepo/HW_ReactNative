import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import BottomFixedNavigation from '../../components/BottomFixedNavigation';
import FixedTopBar from '../../components/FixedTopBar';

const CloudyImage = './weatherImage/cloudy.png';
const ClearImage = './weatherImage/sunny.png';
const RainyImage = './weatherImage/rainy.png';
const HazeImage = './weatherImage/haze.png';
const SnowImage = './weatherImage/snow.png';
const FogImage = './weatherImage/fog.png';
const MistImage = './weatherImage/mist.png';

const API_WEATHER = 'http://10.0.2.2:8080/weather-crawler/current-weathers/by-city-name';

export default class HomeWeather extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation, city } = this.props;

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
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let weatherDesc = this.state.weather[0].description;
    let windSpeed = this.state.wind.speed;
    let cloudDegree = this.state.clouds.all;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;

    let weatherImage;

    switch (weatherMain) {
     case 'Clouds':
       weatherImage = require(CloudyImage);
       break;
     case 'Haze':
       weatherImage = require(HazeImage);
       break;
     case 'Clear':
       weatherImage = require(ClearImage);
       break;
     case "Rain":
       weatherImage = require(RainyImage);
       break;
     case "Fog":
       weatherImage = require(FogImage);
       break;
     // Snow인지 불 명확함
     case "Snow":
       weatherImage = require(SnowImage);
       break;
     case "Mist":
       weatherImage = require(MistImage);
     default:
       weatherImage = require(ClearImage);
       break;
     }

    return (
      <View style={styles.container}>
        <Card>
          <Card.Title title="Daejeon" subtitle="현재 날씨 입니다" />
          <Card.Content>
            <Text style={styles.text}>temp: {celsius.toFixed(1)}</Text>
            <Text style={styles.text}>wind speed: {windSpeed} m/s</Text>
            <Text style={styles.text}>weatherMain: {weatherMain}</Text>
            <Text style={styles.text}>weatherDesc: {weatherDesc}</Text>
            <Text style={styles.text}>cloudDegree: {cloudDegree}</Text>
            <Text style={styles.text}>barometric pressure: {pressure} hPa</Text>
            <Text style={styles.text}>humidity: {humidity} %</Text>
          </Card.Content>
          <Card.Cover style={styles.cardImage} source={weatherImage} />
        </Card>
      </View>
    );
  }
}

// flex1이 아이콘들을 오른쪽에 붙게함
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#ffffff',
  },

  text: {
    fontFamily: 'JejuGothic',
    marginBottom: 10,
    fontSize: 16,
  },

  cardImage: {
    marginTop: 20,
  },

});
