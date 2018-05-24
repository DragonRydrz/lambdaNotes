import { ADD_NEW_NOTE } from '../actions/newNote';
import { EDIT_NOTE } from '../actions/editNote';
import { DELETE_NOTE } from '../actions/deleteNote';
import { SIGN_OUT } from '../actions/signOut';
import { CREATE_USER } from '../actions/createUser';
import { LOGIN } from '../actions/login';
import { ERROR } from '../actions/login';
import { LOADING } from '../actions/loading';

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
      return { ...state, isLoading: action.payload };
      break;
    case ADD_NEW_NOTE:
      return { ...state, notes: action.payload };
    case EDIT_NOTE:
      // let notes = state.notes.filter(item => item.id !== action.payload.id);
      // notes.unshift(action.payload);
      return { ...state, notes: action.payload };
    case DELETE_NOTE:
      // let newNotes = state.notes.filter(item => item.id !== action.payload);
      return { ...state, notes: action.payload };
    case LOGIN:
      return {
        ...state,
        activeUser: action.payload,
        loggedIn: true,
        notes: action.payload.notes,
        isLoading: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        notes: [],
        activeUser: null,
        loggedIn: false,
      };
    case CREATE_USER:
      return {
        ...state,
        activeUser: action.payload,
        notes: action.payload.notes,
        loggedIn: true,
        isLoading: false,
      };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
