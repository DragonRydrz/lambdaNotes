import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { CHANGE_PASSWORD } from './types';
import { ERROR } from './types';
import host from '../host';

// const host = 'https://ajlnbe.herokuapp.com/api/login';

export const login = (data, navigate) => dispatch => {
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
