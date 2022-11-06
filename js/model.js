const modelController = (function(){

    let allBids = getAllBids(); //Массив, принимающий новые заявки из localStorage (Для формы добавления новой заявки)
    
    const filter = JSON.parse(localStorage.getItem("filter")) || {
        product: "",
        status: ""
    }

    // Конструктор для заявки, отправленной через форму
    const Bid = function (id, date, name, phone, email, product) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
        this.status = new Status("Новая", "new"); // статус заявки
    }
    
    // Формирование даты поступления заявки
    function getDate(){
        let preDate = new Date();
        let day = parseInt(preDate.getDate());
        let mounth = parseInt(preDate.getMonth()) + 1;
        let year = parseInt(preDate.getFullYear());
        
        if (day < 10 ) {
            day = `0${day}`
        };
        
        if (mounth < 10) {
            mounth = `0${mounth}`
        };
        
        let date = `${day}.${mounth}.${year}`;
        return date;
    }

    // Конструктор статуса заявки
    const Status = function(text, value){
        this.text = text;
        this.value = value;
        this.color = "warning";
    }

    // Статусы заявок
    const statuses = [
        new Status("Новая", "new"),
        new Status("В работе", "inWork"),
        new Status("Завершена", "done"),
        new Status("Архив", "archive")
    ];

    // Назначение класса цвета через прототип для плашки статуса заявки bootstrap Badges (badge-warning...)
    Status.prototype.setColor = function(){
        let colors = {
        new: "warning",
        inWork: "primary",
        done: "success",
        expectedPayment: "info",
        archive: "secondary",
        failure: "danger"
        }
        this.color = colors[this.value];
    }

    function saveFilter() {
        localStorage.setItem("filter", JSON.stringify(filter)); //запись в LS
    }

    function addNewBid(name, phone, email, product){ //Для формы добавления новой заявки
        // Формирование ID
        let ID = 1; // Начальное значение id
        if (allBids.length > 0) {
        let lastIndex = allBids.length - 1;
        ID = allBids[lastIndex].id + 1;
        }
        let date = getDate();

        //Создание объекта, принимающего новую заявку через конструктор
        let newBid = new Bid(ID, date, name, phone, email, product, "new"); //Для формы добавления новой заявки
        allBids.push(newBid); //Добавление новой заявки в массив (Для формы добавления новой заявки)

        // Далее сохраняем массив allBidss в localstorage
        let JSONBidsList = JSON.stringify(allBids); //"Сериализация" заявки в JSON (Для формы добавления новой заявки)
        localStorage.setItem("allBids", JSONBidsList); //Добавление в localStorage новой заявки (Для формы добавления новой заявки)
    }

    // Получаем сохраненные элементы из localstorage
    function getAllBids() {
        return JSON.parse(localStorage.getItem("allBids")) || [];
    }

    function countBidsbyStatus() {
        const numberBidsbyStatus = {
        all: allBids.length
        }

        // Подсчет заявок по статусам
        function getCountByStatus(status){ //при передаче allBids 2-м аргументом, появляется ошибка "model.js:93 Uncaught TypeError: allBids.forEach is not a function"
        return allBids.reduce((total, item) => item.status.value === status ? total + 1 : total, 0);
        }

        statuses.forEach(function(item) {
        numberBidsbyStatus[item.value] = getCountByStatus(item.value);
        });
        return numberBidsbyStatus;
    }

    // Функция получения обновленного статуса заявки
    function getNewStatus(newStatusText, newStatusValue) {
        const newBidStatus = new Status(newStatusText, newStatusValue);
        newBidStatus.setColor();

        return newBidStatus; // возврат обновленного статуса
    }

    return {
        allBids: allBids, //Для формы добавления новой заявки
        getDate: getDate,
        Status: Status, // выношу наружу конструктор статусов
        filter: filter, // Фильтр заявок
        saveFilter: saveFilter, // функция сохранения значений фильтра в LS
        addNewBid: addNewBid, //Для формы добавления новой заявки
        getAllBids: getAllBids, //Для формы добавления новой заявки
        countBidsbyStatus: countBidsbyStatus, // подсчет заявок по статусам
        getNewStatus: getNewStatus, // ф-ия получения обновленного статуса заявки

    }
})();


