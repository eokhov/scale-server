// Кусок из site2.hbs показывает/скрывает блок с кнопками
const content = document.querySelector('.content');

content.addEventListener('mouseover', (e) => {
  let elem = e.target.closest('.card-wrap');
  if(!elem) return;
  elem.lastElementChild.classList.toggle('open')
});

content.addEventListener('mouseout', (e) => {
  let elem = e.target.closest('.card-wrap');
  if(!elem) return;
  elem.lastElementChild.classList.toggle('open')
});