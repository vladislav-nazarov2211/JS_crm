const formViewController = (function(){

  const formDOMStrings = {
    bidForm: "#bidForm",
    bidFormName: "#bidFormName",
    bidFormPhone: "#bidFormPhone",
    bidFormEmail: "#bidFormEmail",
    bidFormProduct: '#productSelect',
  }

  //Получение введенных в форму данных
  function getBidFormInput(){
    // Создаю переменную, которая принимает коллекцию из подэлементов <option></option>
    const productsOptions =  document.querySelector(formDOMStrings.bidFormProduct).options;
    return {
      name: document.querySelector(formDOMStrings.bidFormName), //если добавлю .value, то значение не попадает в localStorage. Почему?
      phone: document.querySelector(formDOMStrings.bidFormPhone), //если добавлю .value, то значение не попадает в localStorage. Почему?
      email: document.querySelector(formDOMStrings.bidFormEmail), //если добавлю .value, то значение не попадает в localStorage. Почему?
      product: {
        optionName: productsOptions[productsOptions.selectedIndex].value, // значение <option value="course-html"></option>
        optionText: productsOptions[productsOptions.selectedIndex].text // содержимое опции "Курс по верстке" (то, что видит на странице посетитель)
      }
    }
  }
  return {
    getBidFormInput: getBidFormInput,
    getFormDOMStrings: function() {
      return formDOMStrings;
    }
  }
})();