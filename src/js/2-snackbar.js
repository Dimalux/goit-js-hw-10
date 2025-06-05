'use strict';

// Бібліотека iziToast
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



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
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    })
       .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    }).catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      }) })

      
  }, delayValue);
}


// .then(data => console.log(`✅ Fulfilled promise in ${delayValue}ms`)
// .catch(error => console.log(`❌ Rejected promise in ${delayValue}ms`));