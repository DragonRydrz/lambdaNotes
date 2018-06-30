import axios from 'axios';

import host from '../host';
import { CHECK_USERNAME } from './types';

export const checkUsername = (username, navigate) => {
  axios
    .get(`${host}/api/login/${username}`)
    .then(response => {
      navigate('ForgotPassword', { question: response.data.question });
    })
    .catch(err => console.log(err));
};
