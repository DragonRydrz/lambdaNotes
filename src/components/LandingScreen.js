import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { Button } from './common';

class LandingScreen extends Component {
  render() {
    const {
      containerStyle,
      welcomeStyle,
      aboutStyle,
      textStyle,
      buttonContainerStyle,
    } = styles;
    return (
      <SafeAreaView style={containerStyle}>
        <View style={textStyle}>
          <Text style={welcomeStyle}>Welcome</Text>
          <Text style={welcomeStyle}>to</Text>
          <Text style={welcomeStyle}>LambdaNotes</Text>
          <Text style={aboutStyle}>
            This is a simple app to store notes securly. Please do not include
            any sensitive information in your notes. (i.e. Social Security
            number, Credit Card number, passwords...)
          </Text>
        </View>
        <View style={buttonContainerStyle}>
          <Button onPress={() => this.props.navigation.navigate('Login')}>
            Existing User
          </Button>
          <Button onPress={() => this.props.navigation.navigate('CreateUser')}>
            Create Account
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcomeStyle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutStyle: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
  },
  // textStyle: {
  //   flex: 2,
  // },
  buttonContainerStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

export default LandingScreen;
