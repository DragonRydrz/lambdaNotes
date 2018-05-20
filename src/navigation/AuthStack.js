import { createStackNavigator } from 'react-navigation';

import LandingScreen from '../Screens/LandingScreen';
import LoginForm from '../Screens/LoginForm';
import CreateUser from '../Screens/CreateUser';

export default createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
      navigationOptions: {
        title: 'Home',
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
