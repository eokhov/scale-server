
const nameInput = document.getElementById('name')
const siteInput = document.getElementById('site')
const nummeltInput = document.getElementById('nummelt')

const optionsBlock = document.querySelector('.option-block')
const optionsList = document.querySelectorAll('.option')

nameInput.addEventListener('focus', () => {
  optionsBlock.classList.add('visible')
})
nameInput.addEventListener('blur', () => {
  optionsBlock.classList.remove('visible')
})

optionsBlock.addEventListener('click', (e) => {
  const targetElem = e.target
  let dataName = ''

  if(targetElem.dataset.name){
    nameInput.value = targetElem.firstElementChild.innerHTML
    dataName = targetElem.dataset.name
    getSet(dataName)
  } else {
    nameInput.value = targetElem.innerHTML
    dataName = targetElem.parentElement.dataset.name
    getSet(dataName)
  }
})

class Setting {
  constructor(setObj, parentElem){
    this.site = setObj.site;
    this.nummelt = setObj.nummelt;
    this.materials = setObj.materials;
    this.parentElem = parentElem;
  }

  renderSite(elem) {
    elem.value = this.site;
  }

  renderActual(elem) {
    elem.value = this.nummelt;
  }

  renderFiealds() {

    while(this.parentElem.firstChild){
      this.parentElem.removeChild(this.parentElem.firstChild)
    }


    this.materials.forEach(element => {
      this.parentElem.insertAdjacentHTML('beforeend', 
      `<div class="input-block">
        <input type="text" name="material" class="scale-input material-input" value="${Object.keys(element)}" placeholder="Наименование">
        <input type="number" name="weigth" class="scale-input weigth-input" value="${Object.values(element)}" placeholder="Вес">
        
        <button type="button" class="add-button">
          <i class="icon-MS icon-ReturnKey"></i>
        </button>
      </div>`)
    })

    for(let i = 2; i < this.parentElem.children.length; i++){
      this.parentElem.children[i].insertAdjacentHTML('beforeend', `
      <button type="button" class="close-button">
        <i class="icon-MS icon-Delete"></i>
      </button>`)
    }
  }
}

const getSet = (name) => {
  let dataObj = {set: name}
  fetch('/create/settings', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(dataObj)
  })
  .then((response) => response.json())
  .then((data) => {
    let setting = new Setting(data, containerInput)
    return setting
  })
  .then((set) => {
    set.renderSite(siteInput)
    set.renderActual(nummeltInput)
    set.renderFiealds()
  })
  .then(() => {
    showFormValue()
    getFormValue()
  })
}
