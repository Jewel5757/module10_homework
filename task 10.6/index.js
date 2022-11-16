const wsUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded(){
  //находим наши дом элементы
  const infoOutput = document.querySelector('.info_output');
  const chatOutput = document.querySelector('.chat_output');
  const input = document.querySelector("input");
  const sendBtn = document.querySelector('.btn_send');
  const btn = document.querySelector('.j-btn-test');
  const deleteMessages = document.querySelector('.delete-messages');


  //создаем объект сокет и пишем туда урл
  let socket = new WebSocket(wsUrl);

  //события сокета, которые мы будем обрабатывать
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  //если приходит сообщение
  // если оно полученное (isRecieved), то пишем true  в третий параметр
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }

  //если что-то пошло не так
  socket.onerror = () => {
    infoOutput.innerText = "При передачи данных произошла ошибка";
  }


  sendBtn.addEventListener('click', sendMessage);

  //функция, чтобы отправить сообщение
  //проверяем сперва, что в инпуте не пустая строчка, чтоб пользователь всякую хрень не отправлял за зря
  function sendMessage(){
    if (input.value === "") return;
  //если input.value не пустой, тогда отправляем сообщение, оно не полученное, пожтому isRecieved - false
    socket.send(`Сервер:  ${input.value}`);
    writeToChat(input.value, false);
    input.value = "";
    console.log(input.value);
  }
//если сообщение получено (isRecieved), то с помощью тернарного оператора мы присваиваем класс Recieved
// а если оно не isRecieved, то есть оно не полученное, то вешаем класс отправленное
//message приходит из вебсокета
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div}`
    //к текущему содержимому блока добавляем через плюс новое сообщение
    chatOutput.innerHTML += messageHTML;
  }

  // Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let mapLink = `
  <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}'>Ваше местоположение</a>
  `;
  writeToChat(mapLink,false)
}
// если ошибка
const error = () => {
  infoOutput.textContent = 'Невозможно получить ваше местоположение';
}

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    infoOutput.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    infoOutput.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

//функция, чтобы очистить чат
deleteMessages.addEventListener('click', () => {
	chatOutput.innerHTML = " ";
  });
}

document.addEventListener('DOMContentLoaded' , pageLoaded);