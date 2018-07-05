import {
  ADD_NEW_NOTE,
  CHANGE_PASSWORD,
  CLEAR_ERROR,
  CREATE_USER,
  DELETE_NOTE,
  EDIT_NOTE,
  ERROR,
  GET_NOTES,
  LOADING,
  LOGIN,
  SIGN_OUT,
} from '../actions/types';

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
    case GET_NOTES:
      console.log('in GET_NOTES');
      return { ...state, isLoading: false, notes: action.payload };
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
