const editController = (function(modelCtrl, editUiCtrl, tableUiCtrl){

  const saveBtn = document.querySelector(editUiCtrl.editDOMStrings.saveBtn);
  const deleteBtn = document.querySelector(editUiCtrl.editDOMStrings.deleteBtn);
  const countBidsbyStatus = modelCtrl.countBidsbyStatus();
  const editBidData = getBidData();

  // Ф-ия проверки на статус "Архив", если true, то кнопка "Удалить в архив" прячется
  function archiveReady(){
    if (editBidData.status.value === "archive"){
      return deleteBtn.style.display = "none";
    }
  }

  function init(){
    editUiCtrl.showBidData(editBidData);
    tableUiCtrl.displayCountBadges(countBidsbyStatus);
    archiveReady();
    
    setupEventListeners();
  }
  function setupEventListeners(){

    saveBtn.addEventListener("click", editBid); // прослушка события по клику на кнопку "Сохранить изменения"

    deleteBtn.addEventListener("click", function(){
      if (editBidData.status.value !== "archive") { // проверка наличия у заявки статуса "Архив"
        const archiveStatus = new modelCtrl.Status("Архив", "archive"); //если true, заявка удаляется в архив
        archiveStatus.setColor();
        editBidData.status = archiveStatus;
        editBidData.date = "изм. " + modelCtrl.getDate();
        localStorage.setItem("allBids", JSON.stringify(modelCtrl.allBids));
      } else { // false, работа ф-ии прекращаяется, на кнопке только срабатывает ссылка на страницу со всеми заявками 
        return;
      }
    })
  }


  // Функция получения данных из заявки
  function getBidData(){
    // Получение ID заявки из части строки адреса (GET-запрос) после символа ?, включая символ ?(?request-id=), с помощью объекта Location и его свойства .search
    const currentBidId = parseInt(location.search.split("=")[1]); //преобразую подстроку в массив, разделяя элементы по символу "=", далее, с помощью лимитера [1] у метода split() отсекаю request-id, и получаю значение id, которое из строки преобразую в число с помощью parseInt()

    return modelCtrl.allBids.find(item => item.id === currentBidId);

  }

  // Функция редактирования заявки
  function editBid(){
    const bidData = editUiCtrl.getBidFormData(modelCtrl.getNewStatus); // запись в переменную функции сбора данных из формы редактора заявки (edit.view.js)

    if (bidData) {
      Object.assign(editBidData, bidData, {date: "изм. " + modelCtrl.getDate()});

      localStorage.setItem("allBids", JSON.stringify(modelCtrl.allBids));
    }
  }

  return {
    init
  }

})(modelController, editViewController, tableViewController);

editController.init();