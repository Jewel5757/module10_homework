//ловим селекторы из html
const btn = document.querySelector('.btn');
const result = document.getElementById('result');
const imageWidth = document.getElementById('input1');
const imageHeight = document.getElementById('input2');
let numImagesAvailable = 20; 
const randomNumber = Math.floor(Math.random() * numImagesAvailable);

let err1 = document.getElementById('error1');
let err2 = document.getElementById('error2');
err1.textContent = '';
err2.textContent = '';


//возвращаем фетч

 const useRequest = (url) => {
    return fetch(url)
    .then((response) => {
      console.log('response', response);
      return response.json();
      })
      .then((json) => { return json; })
      .catch(() => { console.log('error') });
  
  };
  
  //проверяем диапазон введенных чисел

  const displayResult = (apiData) => {
    let cards = '';
    if (!(imageWidth.value >= 100 && imageWidth.value <= 500)) {
    err1.textContent = 'Ширина картинки вне диапазона от 100 до 500';
    return;
  } else if (!(imageHeight.value >= 100 && imageHeight.value <= 500)) {
    err2.textContent = 'Высота картинки вне диапазона от 100 до 500';
    return;
  } else {
//если все ок, нужно отобразить картинки, для этого создаем карточки с картинками как в вебинаре
    apiData.forEach(item => {
    let cardBlock = `
        <div class="card">
        <img
          src="${item.download_url}"
          class="card-image" style='width:${imageWidth.value}px; height:${imageHeight.value}px;' 
        />
        </div>
      `;
      cards = cards + cardBlock;
    });
    result.innerHTML = cards;
  };
  };

  btn.addEventListener('click', async () => {
    let requestResult = await useRequest(`https://picsum.photos/v2/list?page=${numImagesAvailable}&limit=${randomNumber}`); //запрос, в который передается randomNumber и лимит
  
    let displayRes = await displayResult(requestResult); 
    let reqJson = JSON.stringify(requestResult);
    let strJson = localStorage.setItem('myJSON',reqJson); //сохраняем данные 
    
    });

    document.addEventListener("DOMContentLoaded", async () => {

      let myjson = localStorage.getItem('myJSON'); //получаем данные по ключу
      let toLocal = JSON.parse(myjson);
 
      
      let cards = ''; //снова подгружаем предыдущие картинки
        toLocal.forEach(item => {
          let cardBlock = `
          <div class="card">
          <img
            src="${item.download_url}"
            class="card-image" style='width:300px; height:300px;' 
          />
          </div>
        `;
        cards = cards + cardBlock;
      });
      result.innerHTML = cards;
      });
    


/* Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «ширина картинки».
Заголовок второго input — «высота картинки».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 100 до 500 или не является числом — выводить ниже текст «Ширина картинки вне диапазона от 100 до 500»;
Если число во втором input не попадает в диапазон от 100 до 5000 или не является числом — выводить ниже текст «Высота картинки вне диапазона от 100 до 500»;
Если числа попадают в диапазон от 100 до 500 — сделать запрос по URL https://source.unsplash.com/collection/928423/${imageWidth}x${imageHeight}/?sig=${random     Number}, где GET-параметр imageWidth — это число из первого input, 
imageHeight — это введённое число второго input, randomNumber - число которое генерируется с помощью функции Math.floor(Math.random() * numImagesAvailable);
где numImagesAvailable — какое количество фото должно браться из коллекции, а также randomNumber — является аргументом функции при выполнении кнопки "Запрос", не забываем что они должны ограничиваться по отображению на странице, делается это с помощью цикла

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage). */