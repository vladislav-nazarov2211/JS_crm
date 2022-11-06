const formController = (function(modelCtrl, formUiCtrl){

  const DOM = formUiCtrl.getFormDOMStrings();
  
  function setupEventListeners(){
    document.querySelector(DOM.bidForm).addEventListener("submit", ctrlAddNewBid);
  }

  // Получение данных из localstorage
  modelCtrl.getAllBids();

  // Функция срабатывающая после отправки формы
  function ctrlAddNewBid(e){
    e.preventDefault(); // отмена действия по умолчанию

    generateTestData.init(); // вызов генератора тестовых данных
    // Получение данных из формы добавления заявки

    const input = formUiCtrl.getBidFormInput();
    modelCtrl.addNewBid(input.name.value, input.phone.value, input.email.value, input.product);
  }

  return {
    init: function(){
      setupEventListeners()
    }
  }
})(modelController, formViewController);

formController.init();