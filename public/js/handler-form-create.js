'use strict'

const scaleForm = document.getElementById('scaleForm');
let materialField
let weigthField
const totalWeigth = scaleForm.totalweigth;
const submitBar = document.querySelector('.submit-block');
// const addButton = document.querySelector('.btn-add');
const fieldsetMaterial = document.querySelector('.main-material');
const containerInput = document.querySelector('.input-container')

// Remove text fields materials
fieldsetMaterial.addEventListener('click', function(event) {
  let target = event.target;
  if(target.className == 'close-button' || target.className == 'icon-MS icon-Delete'){
    const inputBlk = target.closest('.input-block');
    inputBlk.remove();
    showFormValue();
  } else if (target.className == 'add-button' || target.className == 'icon-MS icon-ReturnKey') {
    const inputBlk = target.closest('.input-block');
    const template = `
    <div class="input-block">
      <input type="text" name="material" class="scale-input material-input" placeholder="Наименование">
      <input type="number" name="weigth" class="scale-input weigth-input" value="0" placeholder="Вес">

      <button type="button" class="add-button">
        <i class="icon-MS icon-ReturnKey"></i>
      </button>
      <button type="button" class="close-button">
        <i class="icon-MS icon-Delete"></i>
      </button>
    </div>
    `;
    inputBlk.insertAdjacentHTML('afterend', template)
    showFormValue();
    getFormValue();
  }
});

// Get value from weigth & material fields
const getFormValue = () => {
  materialField = scaleForm.material;
  weigthField = scaleForm.weigth;

  weigthField.forEach(item => {
    item.addEventListener('blur', showFormValue);
  });

  materialField.forEach(item => {
    item.addEventListener('blur', showFormValue);
  });
};

// Fill values submit bar
function showFormValue() {
  materialField = scaleForm.material;
  while (submitBar.firstChild) {
    submitBar.removeChild(submitBar.firstChild);
  }
  const weigthValue = [];
  materialField.forEach(item => {
    if(item.value) {
      submitBar.insertAdjacentHTML('beforeend', `<tr><td>${item.value}</td><td class="item-total">${item.nextElementSibling.value}</td></tr>`);
      weigthValue.push(item.nextElementSibling.value);
    }
  });
  let result = weigthValue.reduce((sum, current) => sum + +current, 0);
  totalWeigth.value = result;
};
