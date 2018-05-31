import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { LOADING } from './types';
import host from '../host';
import { LOGIN } from './types';
import { ERROR } from './types';

// const host = 'https://ajlnbe.herokuapp.com/api/login';

export const login = (data, navigate) => dispatch => {
  axios
    .post(`${host}/api/login`, data)
    .then(response => {
      // const user = response.data.user;
      AsyncStorage.setItem('Dragons!', response.data.token);
      dispatch({
        type: LOGIN,
        payload: response.data.user,
      });
      navigate('NotesList');
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: 'Login failed.  Please try again.' });
      dispatch({ type: LOADING, payload: false });
    });
};
