import { ERROR } from './types';
import { CLEAR_ERROR } from './types';

export const postError = err => {
  return {
    type: ERROR,
    payload: err,
  };
};
export const clearError = () => {
  return { type: CLEAR_ERROR };
};
