import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { GET_NOTES } from './types';
import host from '../host';

// const host = 'https://ajlnbe.herokuapp.com/api';

export const getNotes = () => dispatch => {
  AsyncStorage.getItem('Dragons!').then(token => {
    axios
      .get(`${host}/api/getnotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(`Getting notes with: ${token}`);
        console.log(response.data.notes);
        dispatch({
          type: GET_NOTES,
          payload: response.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'ERROR', payload: err });
      });
  });
};
