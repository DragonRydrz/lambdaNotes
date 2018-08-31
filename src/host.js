// const host = 'http://localhost:5000';
// const host = 'http://159.89.34.14';
const host = 'http://www.lambdanotes.com';

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
