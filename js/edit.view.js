const editViewController = (function(){

  const editDOMStrings = {
    bidId: '[data-id]',
    bidDate: '[data-date]',
    bidFormFields: '[data-form-item]',
    saveBtn: '[data-save]',
    deleteBtn: '[data-delete]',
    bidCardBody: '[data-card]'
  }

  //Вывод данных заявки на странице редакторования
  function showBidData(bidData){
    const bidId = document.querySelector(editDOMStrings.bidId); // ID заявки
    const bidDate = document.querySelector(editDOMStrings.bidDate); // дата создания заявки
    const [productList, name, email, phone, statusList] = document.querySelectorAll(editDOMStrings.bidFormFields); //деструктурирующее присвоение значений полей формы

    //Получение и запись данных заявки в поля формы редактора заявки (работа с заявкой)
    bidId.innerText = bidData.id; // ID заявки
    bidDate.innerText = bidData.date; // дата создания заявки
    productList.value = bidData.product.optionName; //тип продукта
    name.value = bidData.name; //Имя клиента
    email.value = bidData.email; // Email клиента
    phone.value = bidData.phone; // телефон клиента
    statusList.value = bidData.status.value; // статус заявки
  }

  // Сбор данных из формы редактора заявки
  function getBidFormData(getNewStatus){
    const [productList, name, email, phone, statusList] = document.querySelectorAll(editDOMStrings.bidFormFields);

    return {
      id: parseInt(document.querySelector(editDOMStrings.bidId).innerText), // получение ID заявки, с преобразованием в число
      name: name.value,
      email: email.value,
      phone: phone.value,
      product: {
        optionText: productList.selectedOptions[0].text,
        optionName: productList.value
      },
      status: getNewStatus(statusList.selectedOptions[0].text, statusList.value)
    }
  }

  return {
    editDOMStrings,
    showBidData,
    getBidFormData
  }
})();