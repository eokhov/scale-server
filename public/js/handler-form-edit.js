document.body.insertAdjacentHTML('beforeend', '<div class="messageBlock"></div>');

// start Message block
const showMessage = () => {
  const messageHtml = `
    <div class="messageWrapper">
      <div class="messageIcon">
        <i class="icon-MS icon-Completed"></i>
        <h3>Изменения успешно сохранены!</h3>
      </div>
      <button type="button" class="messageClose">
        <i data-name="clouse-btn" class="icon-MS icon-Cancel"></i>
      </button>
    </div>`;

  const messageBlock = document.querySelector('.messageBlock');
  messageBlock.insertAdjacentHTML('beforeend', messageHtml);
};

const messageBlock = document.querySelector('.messageBlock');
messageBlock.addEventListener('click', event => {
  if(event.target.dataset.name === 'clouse-btn'){
    let messageWrap = event.target.closest('.messageWrapper');
    messageWrap.remove();
  }
});

showFormValue()
getFormValue()

scaleForm.addEventListener('submit', event => {
  event.preventDefault();

  let bodyJSON = new FormData(scaleForm);
  
  fetch('/edit', {
    // headers: { "Content-Type": "application/json; charset=utf-8" }, 
    method: 'POST',
    body: bodyJSON,
  })
  .then((response) => response.status)
  .then((status) => {
    if(status===200) {
      showMessage();
    }else{
      alert('Есть проблема');
    }
  })
});
// End Message block