import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const ADD_NEW_NOTE = 'ADD_NEW_NOTE';
const host = 'https://ajlnbe.herokuapp.com/api';

export const newNote = data => dispatch => {
  AsyncStorage.getItem('Dragons!').then(token => {
    if (data.title) {
      axios
        .post(`${host}/newnote`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          dispatch({
            type: ADD_NEW_NOTE,
            payload: response.data.notes,
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: 'ERROR', payload: err });
        });
    } else {
      alert('Title required to add a new note!');
    }
  });
};
