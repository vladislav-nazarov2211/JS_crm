const tableViewController = (function(){

  const tableDOMStrings = {
		bidsTableBody: "#RequestsBidsTable", // раздел таблицы (<tbody id="RequestsBidsTable"></tbody>), в которой выводятся заявки
    RequestsBidsTableRow: "#RequestsBidsTable tr",
    filterStatus: "#filterStatus", // Фильтр статуса заявок
    productFilter: "#productFilter", // Фильтр продуктов (выпадающий список <select><option>1</option>...</select>)
    filterLinks: "#filterLinks"
	}

  // Функция для формирования и отображения сформированной заявки в разметке странице
  function renderBids(bidsArray){
    document.querySelector(tableDOMStrings.bidsTableBody).innerHTML = ""; 

    bidsArray.forEach(function(item){
      document.querySelector(tableDOMStrings.bidsTableBody).insertAdjacentHTML("beforeend",
          // Шаблонная строка с разметкой для отображения заявки
        `<tr>
          <th scope="row">${item.id}</th>
          <td>${item.date}</td>
          <td>${item.product.optionText}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
          <td>
            <div class="badge badge-pill badge-${item.status.color}">
              ${item.status.text}
            </div>
          </td>
          <td>
            <a href="03-crm-edit-bid.html?request-id=${item.id}">Редактировать</a>
          </td>
        </tr>`
      ); // ?request-id= добавляется в конце строки адреса, принимая id выбранной заявки
    });
  }

  //Функция отображения кол-ва заявок по статусу для панели слева
  function displayCountBadges(countedStatusesObj) {
		for (let key in countedStatusesObj) {
			const badgeElement = document.createElement("div");
			badgeElement.classList.add("badge");
			badgeElement.innerText = countedStatusesObj[key];

			document.querySelector(`a[data-status=${key}]`).append(badgeElement);
		}
	}

  // Функция фильтрации и сортировки заявок по статусу и типу выбранного продукта
  function setActiveItems(filter) {

    if (filter.status) { //фильтрация по статусу
      const filterElements = document.querySelectorAll(`[data-status="${filter.status}"]`);
      const activeElements = document.querySelectorAll(".active");

      if (filterElements) {
        if (activeElements) {
          activeElements.forEach(function(item) {
            item.classList.remove("active"); //удаление класса active заявкам, не подходящим под критерии фильтра
          });
        }
        filterElements.forEach(function(item) {
          item.classList.add("active"); //добавления класса active заявкам, подходящим под критерии фильтра
        });
      }
    }

    if (filter.product) { //фильтрация по продукту
      document.querySelector(tableDOMStrings.productFilter).value = filter.product;
    }  
  }

  return {
    tableDOMStrings: tableDOMStrings,
    renderBids: renderBids,
    displayCountBadges: displayCountBadges,
    setActiveItems: setActiveItems
  }
})();