import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { loading } from '../actions/loading';
import {
  Card,
  CardSection,
  Input,
  Button,
  Header,
  Spinner,
  Text,
} from '../components/common';

class Options extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    comfirmNewPassword: '',
    error: this.props.error,
  };

  render() {
    // console.log(this.props.error.response);
    return (
      <SafeAreaView>
        <Header headerText="Settings" />
        <Card>
          <Header headerText="Change Password" />
        </Card>
        <Card>
          <CardSection>
            <Input
              placeholder="current password"
              label="Current"
              value={this.state.oldPassword}
              onChangeText={oldPassword => this.setState({ oldPassword })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="new password"
              label="New"
              value={this.state.newPassword}
              onChangeText={newPassword => this.setState({ newPassword })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm"
              value={this.state.confirmNewPassword}
              onChangeText={confirmNewPassword =>
                this.setState({ confirmNewPassword })
              }
            />
          </CardSection>

          {this.props.error ? (
            <Text style={styles.errorTextStyle}>
              {this.props.error.response.message}
            </Text>
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
    return <Button onPress={this.handleChangePassword}>Change Password</Button>;
  };

  handleChangePassword = () => {
    console.log(this.props);
    this.props.loading(true);
    setTimeout(() => this.props.loading(false), 2000);
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
    error: state.error,
  };
};

export default connect(mapStateToProps, { loading })(Options);
