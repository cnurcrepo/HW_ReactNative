import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

export default class FixedTopBar extends React.Component {
  render() {
    return (
      <Appbar style={appBarStyles.top}>
        <Text>Title</Text>
        <Appbar.Action icon="home" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="star" onPress={() => console.log('Pressed mail')} />
      </Appbar>
    );
  }
}

const appBarStyles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
