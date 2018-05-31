import { ADD_NEW_NOTE } from '../actions/types';
import { CHANGE_PASSWORD } from '../actions/types';
import { CLEAR_ERROR } from '../actions/types';
import { CREATE_USER } from '../actions/types';
import { DELETE_NOTE } from '../actions/types';
import { EDIT_NOTE } from '../actions/types';
import { ERROR } from '../actions/types';
import { LOADING } from '../actions/types';
import { LOGIN } from '../actions/types';
import { SIGN_OUT } from '../actions/types';

const initState = {
  notes: [],
  activeUser: null,
  loggedIn: false,
  error: null,
  token: null,
  isLoading: false,
};

// export default combineReducers(notes);

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      console.log('in loading reducer', action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };
      break;
    case ADD_NEW_NOTE:
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case EDIT_NOTE:
      // let notes = state.notes.filter(item => item.id !== action.payload.id);
      // notes.unshift(action.payload);
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case DELETE_NOTE:
      // let newNotes = state.notes.filter(item => item.id !== action.payload);
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case LOGIN:
      return {
        ...state,
        activeUser: action.payload,
        loggedIn: true,
        notes: action.payload.notes,
        isLoading: false,
        error: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        notes: [],
        activeUser: null,
        loggedIn: false,
        error: null,
      };
    case CREATE_USER:
      return {
        ...state,
        activeUser: action.payload,
        notes: action.payload.notes,
        loggedIn: true,
        isLoading: false,
        error: null,
      };
    case ERROR:
      console.log(action.payload, 'error payload');
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
