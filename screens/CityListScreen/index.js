import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import FixedTopBar from '../../components/FixedTopBar';

const API_CITIES = 'http://10.0.2.2:8080/weather-crawler/available-cities';

export default class CityListScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  async componentDidMount() {
    fetch(API_CITIES)
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Button icon={{source : "label", direction: 'ltr'}} raised theme={{ roundness: 3 }}>{city}</Button>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <FixedTopBar></FixedTopBar>
        <ScrollView>
          <FlatList style={styles.container}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item}
                    data={this.state.cities}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 18,
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
  },

});
