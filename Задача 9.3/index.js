
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.resultR');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.btn');


/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}



btnNode.addEventListener('click', () => {
  // получаем введенное значение из инпута
const value = document.querySelector('input').value;
console.log(value);



const url = new URL("https://picsum.photos/v2/list");
url.searchParams.append('limit', value);


console.log(url);
  if (value > 0 && value < 10 ) {
    useRequest(url, displayResult);

  } else {
    resultNode.textContent = 'число вне диапазона от 1 до 10';
  };
  });
