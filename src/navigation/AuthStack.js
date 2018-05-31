import { createStackNavigator } from 'react-navigation';

import CreateUser from '../Screens/CreateUser';
import ForgotPassword from '../Screens/ForgotPassword';
import LandingScreen from '../Screens/LandingScreen';
import LoginForm from '../Screens/LoginForm';

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
        title: 'Login',
      },
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: {
        title: 'Create User',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRoute: 'Landing',
  }
);
