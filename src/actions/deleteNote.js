import axios from 'axios';
import { AsyncStorage } from 'react-native';
import host from '../host';

export const DELETE_NOTE = 'DELETE_NOTE';

// const host = 'https://ajlnbe.herokuapp.com/api';

export const deleteNote = id => dispatch => {
  AsyncStorage.getItem('Dragons!').then(response => {
    axios
      .delete(`${host}/api/destroynote/${id}`, {
        headers: { Authorization: `Bearer ${response}` },
      })
      .then(response => {
        return dispatch({ type: DELETE_NOTE, payload: response.data.notes });
      })
      .catch(err => {
        console.log(err, token);
        return dispatch({ type: 'ERROR', payload: err });
      });
  });
};
