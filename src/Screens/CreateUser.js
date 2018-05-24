import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, Text } from 'react-native';

import { loading } from '../actions/loading';
import { createUser } from '../actions/createUser';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
} from '../components/common';

class CreateUser extends Component {
  // constructor() {
  //   super();
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  };
  // }
  render() {
    const { buttonViewStyle, errorTextStyle } = styles;
    return (
      <SafeAreaView>
        <Card>
          <CardSection>
            <Input
              placeholder="username"
              label="Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm"
              value={this.state.confirmPassword}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
            />
          </CardSection>

          {this.state.error ? (
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          ) : null}
          <CardSection>{this.renderButtons()}</CardSection>
        </Card>
      </SafeAreaView>
    );
  }
  renderButtons = () => {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <View style={styles.buttonViewStyle}>
        <Button onPress={this.createUserPressed}>Sign Up</Button>
      </View>
    );
  };
  createUserPressed = () => {
    this.props.loading(true);
    this.setState({ error: '' });
    const { password, confirmPassword } = this.state;

    this.state.password === this.state.confirmPassword
      ? this.passwordsMatch()
      : this.setState({ error: 'Passwords do not match!' });
  };
  passwordsMatch = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({ username: '', password: '', confirmPassword: '' });
    this.props.createUser(user, this.props.navigation.navigate);
  };
}

const styles = {
  buttonViewStyle: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { createUser, loading })(CreateUser);
