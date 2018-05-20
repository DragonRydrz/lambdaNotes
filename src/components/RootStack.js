import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import LandingScreen from './LandingScreen';
import LoginForm from './LoginForm';
import CreateUser from './CreateUser';

import NotesList from './NotesList';
import EditNote from '../Screens/EditNote';
import AddNote from '../Screens/AddNote';

const AppStack = createStackNavigator(
  {
    NotesList: {
      screen: NotesList,
      navigationOptions: {
        // title: this.props.username,
      },
    },
    NoteEdit: {
      screen: EditNote,
      navigationOptions: {
        title: 'Notes',
      },
    },
    AddNote: {
      screen: AddNote,
      navigationOptions: {
        title: 'Add New Note',
      },
    },
  },
  {
    initialRouteName: 'NotesList',
  }
);
const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
      navigationOptions: {
        title: 'Welcome',
      },
    },
    Login: {
      screen: LoginForm,
      navigationOptions: {
        title: 'Lambda Notes',
      },
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: {
        title: 'Create User',
      },
    },
  },
  {
    initialRoute: 'Landing',
  }
);

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: `Auth`,
  }
);
