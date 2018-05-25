// import PropTypes from "prop-types";
import { AsyncStorage } from 'react-native';
import { SIGN_OUT } from './types';

export const signOut = () => dispatch => {
  AsyncStorage.removeItem('Dragons!').then(response => {
    dispatch({ type: SIGN_OUT });
  });
};
