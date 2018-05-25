import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { LOADING } from './loading';
import host from '../host';

export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';

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
      console.log(err, 'err');
      alert('Login failed.  Please try again.');
      dispatch({ type: LOADING, payload: false });
    });
};
