// import PropTypes from "prop-types";
import { AsyncStorage } from 'react-native';

export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => dispatch => {
  AsyncStorage.removeItem('Dragons!').then(response => {
    console.log('sign out action');
    dispatch({ type: SIGN_OUT });
  });
};
