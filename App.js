import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeWeatherScreen = './screen/HomeWeather'; 
import CityListScreen from './screens/CityListScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';

const AppNavigator = createStackNavigator(
  {
    CityList: CityListScreen,
    Detail: WeatherDetailScreen,
  },
  {
    initialRouteName: 'CityList',
  }
);

export default createAppContainer(AppNavigator);
