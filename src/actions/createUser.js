import axios from 'axios';
import { AsyncStorage } from 'react-native';
import host from '../host';
import { LOADING } from './types';
import { CREATE_USER } from './types';

// const host = 'https://ajlnbe.herokuapp.com/api/register';

export const createUser = (data, navigate) => dispatch => {
  console.log(`${host}/api/register`, 'host');
  console.log('Data: ', data);
  axios
    .post(`${host}/api/register`, data)
    .then(response => {
      console.log(response, 'response');

      const { user, token } = response.data;
      AsyncStorage.setItem('Dragons!', token);
      dispatch({
        type: CREATE_USER,
        payload: user,
      });
      navigate('NotesList');
    })
    .catch(err => {
      console.log(err, 'error line 28');
      if (err.response.status === 403) {
        alert(err.response.data.message);
        dispatch({ type: 'LOADING', payload: false });
        return;
      }

      alert('Account creation failed.  Please try again.');
      dispatch({ type: 'LOADING', payload: false });
    });
};
