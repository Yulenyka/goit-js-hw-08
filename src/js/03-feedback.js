import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const objectToSave = {};
dataFromLocalStorage();

form.addEventListener(
  'input',
  throttle(event => {
     objectToSave[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});

function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data === null) {
    return;
  }
  email.value = data.email || '';
  message.value = data.message || '';
}

// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? '' : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// const storageData = load(STORAGE_KEY);
// if (storageData) {
//   email.value = storageData.email;
//   message.value = storageData.message;
// }