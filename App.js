import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeWeatherScreen from './screens/HomeWeather';
import CityListScreen from './screens/CityListScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';

import SinglePage from './screens';

const AppNavigator = createStackNavigator(
  {
    CityList: CityListScreen,
    Detail: WeatherDetailScreen,
    HomeWeather: HomeWeatherScreen,
    SingleScreen: SinglePage,
  },
  {
    initialRouteName: 'SingleScreen',
  }
);

export default createAppContainer(AppNavigator);
