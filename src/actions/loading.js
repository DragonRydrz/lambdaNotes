import { LOADING } from './types';

export const loading = data => {
  console.log('in loading');
  return {
    type: LOADING,
    payload: data,
  };
};
