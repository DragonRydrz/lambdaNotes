import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, View, Text, Image } from 'react-native';
import { Button } from '../components/common';
import { clearError } from '../actions/error';
import { authorize } from '../actions/authorize';
import { connect } from 'react-redux';

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
          {/* <Text style={{ ...aboutStyle, fontSize: 20 }}>
            Data can be reset during alpha when new features are being added.
            User data was last reset on 5/27.
          </Text> */}
          <Text style={aboutStyle}>
            This is a simple app to store notes securely. Please do not include
            any sensitive information in your notes. (i.e. Social Security
            number, Credit Card number, passwords...)
          </Text>
        </View>
        <View style={buttonContainerStyle}>
          <Button
            onPress={() => {
              AsyncStorage.getItem('Dragons!')
                .then(token => {
                  console.log(token);
                  if (token) {
                    this.props.authorize(token, this.props.navigation.navigate);
                  } else {
                    this.props.navigation.navigate('Login');
                  }
                })
                .catch(err => null);
              this.props.clearError();
            }}
          >
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

export default connect(
  null,
  { clearError, authorize }
)(LandingScreen);
