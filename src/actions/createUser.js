import axios from 'axios';
import { AsyncStorage } from 'react-native';
import host from '../host';

export const CREATE_USER = 'CREATE_USER';

// const host = 'https://ajlnbe.herokuapp.com/api/register';

export const createUser = (data, navigate) => dispatch => {
  console.log(`${host}/api/register`, 'host');
  axios
    .post(`${host}/api/register`, data)
    .then(response => {
      console.log(response, 'response');
      // if (response.message === 'Username already exists.') {
      //   alert(response.message);
      //   return;
      // }
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

      alert('Account creation failed.  Please try again.');
    });
};
