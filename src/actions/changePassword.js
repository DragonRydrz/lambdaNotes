import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const ERROR = 'ERROR';
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
