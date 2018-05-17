import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const EDIT_NOTE = 'EDIT_NOTE';

const host = 'https://ajlnbe.herokuapp.com/api';

export const editNote = data => dispatch => {
  AsyncStorage.getItem('Dragons!')
    .then(token => {
      axios
        .put(`${host}/updatenote`, data, {
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
