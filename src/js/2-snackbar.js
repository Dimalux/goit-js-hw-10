'use strict';

// Бібліотека flatpickr
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Бібліотека iziToast
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.target.elements;
  const delayValue = +delay.value;
  const stateValue = state.value;

  console.log('delayValue', delayValue);
  console.log('stateValue', stateValue);

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        resolve('OK-fulfilled');
      } else {
        reject('NO-rejected');
      }
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, delayValue);
}
