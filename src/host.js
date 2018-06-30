// const host = 'http://localhost:5000';
const host = 'https://ajlnbe.herokuapp.com';
export default host;

let key = 0;
export const securityQuestions = [
  {
    key: key++,
    label: "Mother's maiden name?",
  },
  {
    key: key++,
    label: "Pet's name?",
  },
  {
    key: key++,
    label: "First child's birthyear?",
  },
];
