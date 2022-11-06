const tableController = (function(modelCtrl, tableUiCtrl){

  const filterInfo = modelCtrl.filter;
	const filterStatus = document.querySelector(tableUiCtrl.tableDOMStrings.filterStatus);
	const productFilter = document.querySelector(tableUiCtrl.tableDOMStrings.productFilter);
	const filterLinks = document.querySelector(tableUiCtrl.tableDOMStrings.filterLinks);

  // Записываем в переменную обьект с подсчитанными статусами
	const countedBidsStatuses = modelCtrl.countBidsbyStatus();

  function init() {
    // Вызываем функцию для отображения подсчитанных статусов в разметке
    tableUiCtrl.displayCountBadges(countedBidsStatuses);

    setupEventListeners();

    activeFilterElements();
  }
  
  // Функция установки прослушек на ссылки фильтра в левой панели и над таблицей вывода заявок 
  function setupEventListeners(){

    filterLinks.addEventListener("click", statusCallbackFunc); // филтр заявок на левой панели

    filterStatus.addEventListener("click", statusCallbackFunc); // фильтр заявок сверху, над таблицей вывода заявок

    function statusCallbackFunc(e){
      filterInfo.status = e.target.dataset.status;
      showFilteredElements(modelCtrl.allBids, filterInfo);

      tableUiCtrl.setActiveItems(modelCtrl.filter);

      modelCtrl.saveFilter();
    }

    productFilter.addEventListener("change", function(e){
      
      filterInfo.product = e.target.value;
      showFilteredElements(modelCtrl.allBids, filterInfo);

      tableUiCtrl.setActiveItems(modelCtrl.filter);

      modelCtrl.saveFilter();
    });
  }

    //<!--Фильтрация заявок-->
  
    //Функция отображения "отфильтрованных" заявок
    function activeFilterElements() {
      showFilteredElements(modelCtrl.allBids, filterInfo);
      tableUiCtrl.setActiveItems(modelCtrl.filter);
    }
  
    // Функция сортировки заявок по статусу и по продукту на странице отображения заявок
    function filterData(bids, filterObject) {
      if (filterObject.status && filterObject.status !== "all") { //Если у заявки статус "true" и не равен "all"
        bids = bids.filter(function(item) { //запуск метода фильтрации массива (filter()) через ф-ию
          return item.status.value === filterObject.status;
        });
      }
      if (filterObject.product && filterObject.product !== "all") { // Если у заявки категория продукта "true" и не "all"
        bids = bids.filter(function(item) { //запуск метода фильтрации массива (filter()) через ф-ию
          return item.product.optionName === filterObject.product;
        });
      }
  
      return bids; // возврат отсортированных заявок (удовлетворяющих фильтру)
    }

    // Функция показа "отфильрованных" заявок
    function showFilteredElements(bids, filter) {
      const filteredData = filterData(bids, filter); // присвоение переменной filteredData ф-ии сортировки заявок, точнее того, что она возвращает после проверок		
      tableUiCtrl.renderBids(filteredData); // отображение отфильтрованных заявок через ф-ию renderBids
    }
    //<!--/Фильтрация заявок-->
  
    return {
      init: init
    }
  
})(modelController, tableViewController);

tableController.init();