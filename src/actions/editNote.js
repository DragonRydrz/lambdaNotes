import axios from 'axios';
import { AsyncStorage } from 'react-native';
import host from '../host';
import { EDIT_NOTE } from './types';

// const host = 'https://ajlnbe.herokuapp.com/api';

export const editNote = data => dispatch => {
  AsyncStorage.getItem('Dragons!')
    .then(token => {
      axios
        .put(`${host}/api/updatenote`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          dispatch({
            type: EDIT_NOTE,
            payload: response.data.notes,
          });
        })
        .catch(err => {
          dispatch({ type: 'ERROR', payload: err });
        });
    })
    .catch(err => {
      dispatch({ type: 'ERROR', payload: err });
    });
};
