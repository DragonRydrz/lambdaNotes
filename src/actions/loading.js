export const LOADING = 'LOADING';

export const loading = data => {
  console.log('in loading');
  return {
    type: LOADING,
    payload: data,
  };
};
