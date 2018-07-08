import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { LOGIN, ERROR } from './types';
import host from '../host';

export const authorize = (data, navigate) => dispatch => {
  // console.log(host);
  axios
    .get(`${host}/api/login`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    })
    .then(response => {
      console.log(response.data.token);
      AsyncStorage.setItem('Dragons!', response.data.token);
      dispatch({ type: LOGIN, payload: response.data.user });
      navigate('NotesList');
      // console.log('in authorize');
      // console.log(response);
      // this.props.authorize(user);
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: 'Authorization Error' });
      // console.log('authorize error');
      // console.log(err);
    });
};
