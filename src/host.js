const host = 'https://ajlnbe.herokuapp.com';
export default host;

let key = 0;
export const securityQuestions = [
  {
    key: key++,
    label: 'Mothers maiden name?',
  },
  {
    key: key++,
    label: 'Pet name?',
  },
  {
    key: key++,
    label: 'First childs birthyear?',
  },
];
