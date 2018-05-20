import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage, Text, View, SafeAreaView } from 'react-native';
import { Card, CardSection, Button, Input, Spinner, Header } from './common';
import DeleteModal from './DeleteModal';
import NotesList from './NotesList';
import { login } from '../actions/login';
import { createUser } from '../actions/createUser';
import { authorize } from '../actions/authorize';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
    loggedIn: false,
    visible: true,
  };

  componentDidMount() {
    const token = AsyncStorage.getItem('Dragons')
      .then(response => response)
      .catch(err => null);
    if (token) {
      this.props.authorize(token);
    }
  }
  componentWillReceiveProps(props) {}

  // deleteModal() {
  //   if (this.state.modalOpen) {
  //     return (

  //     );
  //   }
  //   return null;
  // }

  render() {
    // if (!this.props.loggedIn && props.loggedIn) {
    // this.props.navigation.navigate('NotesList');
    // return null;
    // return <NotesList />;
    // return (
    //   <View style={{ flex: 1, borderWidth: 5, fontSize: 20 }}>
    //     <Text>SHOW ME THIS</Text>
    //   </View>
    // );
    // }
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

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButtons()}</CardSection>
        </Card>
      </SafeAreaView>
    );
  }

  loginOrNotes() {
    return (
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

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButtons()}</CardSection>
      </Card>
    );
  }

  renderButtons() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <View style={styles.buttonViewStyle}>
        <Button
          onPress={() => {
            const user = {
              username: this.state.username,
              password: this.state.password,
            };
            this.setState({ username: '', password: '' });
            return this.props.login(user, this.props.navigation.navigate);
          }}
        >
          Log In
        </Button>
      </View>
    );
  }

  loginPressed() {}
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
    loggedIn: state.loggedIn,
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { login, createUser, authorize })(
  LoginForm
);
