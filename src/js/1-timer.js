'use strict';

// Бібліотека flatpickr
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


// Бібліотека iziToast
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let countdownInterval = null;

const button = document.querySelector('.text-button');
const input = document.querySelector('.text-input');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

button.disabled = true;   // Блокую кнопку (стає неактивною)
input.disabled = false;   // Разблоковую поле вводу (input стає неактивним)

const options = {
  enableTime: true,                 // Дозволити вибір часу
  time_24hr: true,                   // 24-годинний формат
  defaultDate: new Date(),           // Поточна дата за замовчуванням
  minuteIncrement: 1,                // Крок зміни хвилин — 1
  onClose(selectedDates) {           // Колбек при закритті календаря
    const selected = selectedDates[0];  // Вивід вибраної дати в консоль
    if (selected <= new Date()) {
      
      iziToast.error({
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',
});

      return;      
     
    } else {
      userSelectedDate = selected;
      button.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);




button.addEventListener('click', () => {
  if (!userSelectedDate) {
    return;
  } 

  // <-- Інпут стає неактивним, коли йде відлік часу, коли таймер доходить до 00 - знов робимо інпут активним, або, щоб не чекати завершення таймера треба перезавантажити сторінку
  button.disabled = true;  //блокую кнопку
  input.disabled = true;   //блокую input

// Запускаю ТАЙМЕР - setInterval()
  countdownInterval = setInterval(() => {
    const now = new Date();
    const resultTime = userSelectedDate - now;


    // ЗУПИНЯЮ  ТАЙМЕР - clearInterval()
    if (resultTime <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      input.disabled = false;
      return;
    }

    updateTimer(resultTime);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
