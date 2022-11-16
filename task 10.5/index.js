const button = document.querySelector(".btn");
const width = window.screen.width;
const height =window.screen.height;

button.addEventListener('click', () => {
   alert(`Ширина Вашего экрана:${width}px, а высота Вашего экрана: ${height}px`);
  });

//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 


