import Popup from './popup';
import Message from './message';

const ws = new WebSocket('wss://35.160.120.126:10000/ws');

const chat = document.querySelector('.chat__messages');
const chatMessage = document.querySelector('.chat__input');
const buttonSendHandler = document.querySelector('.button');

const users = document.querySelector('.users');

const popupForm = document.querySelector('.popup');
const popupButton = document.querySelector('.popup__button');
const popupInput = document.querySelector('.popup__input');
const popup = new Popup();

ws.onopen = (e) => {
  e.preventDefault();

  popup.open();
  popupInput.value = '';
  popupInput.focus();

  buttonSendHandler.addEventListener('click', () => {
    const message = chatMessage.value;

    if (!message) return;

    ws.send(JSON.stringify({ message }));

    chatMessage.value = '';
  });
};

ws.addEventListener('open', () => {
  // console.log('WebSocket opened');
});

ws.addEventListener('close', () => {
  // console.log('WebSocket closed');
});

ws.addEventListener('error', () => {
  // console.log('WebSocket error');
});

ws.addEventListener('message', (e) => {
  const jsonData = JSON.parse(e.data);

  // eslint-disable-next-line
  if (jsonData.hasOwnProperty('available')) {
    if (jsonData.available) {
      popup.close();

      const newUser = document.createElement('span');
      newUser.classList.add('users__user');
      // newUser.style.color = 'red';
      newUser.textContent = jsonData.username;
      users.appendChild(newUser);
    } else if (!document.querySelector('.error-login')) {
      const errorLogin = document.createElement('span');
      errorLogin.classList.add('error-login');
      errorLogin.textContent = 'Это имя уже существует. Придумайте другое.';
      popupForm.insertBefore(errorLogin, popupInput);
    }
  }

  // eslint-disable-next-line
  if (jsonData.hasOwnProperty('user')) {
    const newUser = document.createElement('span');
    newUser.classList.add('users__user');
    newUser.textContent = jsonData.user;
    users.appendChild(newUser);
  }

  // eslint-disable-next-line
  if (jsonData.hasOwnProperty('userDisconnect')) {
    document.querySelectorAll('.users__user').forEach((user) => {
      if (user.textContent === jsonData.userDisconnect) {
        user.remove();
      }
    });
  }

  // eslint-disable-next-line
  if (jsonData.hasOwnProperty('message')) {

    const newMessage = new Message(jsonData.sessionUser, jsonData.date, jsonData.message).create();

    chat.appendChild(newMessage);

    chatMessage.value = '';
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }
});

popupButton.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.querySelector('.popup__input').value
    || `user${Math.floor(Math.random() * 1024)}${1}`;

  ws.send(
    JSON.stringify({ username: name, available: true }),
  );
});
