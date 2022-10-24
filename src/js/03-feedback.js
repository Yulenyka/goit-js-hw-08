import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(event => {
    const objectToSave = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    objectToSave[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = event.currentTarget.email.value;
  const message = event.currentTarget.message.value;
  console.log({ email, message });
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});

(function dataFromLocalStorage() {
  const objectToSave = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    for (let key in objectToSave) {
      form.elements[key].value = objectToSave[key];
    }
})();