import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Card, CardSection, Input, Button, Header } from '../components/common';

class Options extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    comfirmNewPassword: '',
  };

  render() {
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

          {this.state.error ? (
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          ) : null}
          <CardSection>{this.renderButtons()}</CardSection>
        </Card>
      </SafeAreaView>
    );
  }

  renderButtons = () => {
    return <Button>Change Password</Button>;
  };
}

export default Options;
