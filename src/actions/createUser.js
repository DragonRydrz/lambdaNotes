import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const CREATE_USER = 'CREATE_USER';

const host = 'https://ajlnbe.herokuapp.com/api/register';

export const createUser = (data, navigate) => dispatch => {
  axios
    .post(host, data)
    .then(response => {
      const { user, token } = response.data;
      AsyncStorage.setItem('Dragons!', token);
      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      navigate('NotesList');
    })
    .catch(err => {
      console.log(err);
      alert('Account creation failed.  Please try again.');
    });
};
