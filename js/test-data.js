let generateTestData = (function(){
    const TestItem = function (name, phone, email, product) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.product = product;
    };

    let testData = [
        new TestItem("Михаил Лавренов", "+79636987865", "lavrenov93@gmail.com", "course-html"),
        new TestItem("Евгений Кочетов", "+79856588774", "cochetov.e@yandex.ru.ru", "course-vue"),
        new TestItem("Арина Вишневская", "+79652356655", "arishaval@mail.ru", "course-js"),
        new TestItem("Артур Федоров", "+79654123547", "fedoroff@gmail.com", "course-wordpress"),
        new TestItem("Анастасия Громова", "+79855477887", "anagrom@yandex.ru", "course-php"),
        new TestItem("Григорий Березовский", "+79623584111", "grigber@yandex.ru", "course-html"),
        new TestItem("Филипп Левин", "+79663366547", "levinfil@gmail.com", "course-js"),
  ];

    function randomInt(max){
        return Math.floor(Math.random() * max);
    }

    function insertInUi(){
        let random = randomInt(testData.length);
        let randomizeItem = testData[random];
        document.querySelector("#bidFormName").value = randomizeItem.name;
        document.querySelector("#bidFormPhone").value = randomizeItem.phone;
        document.querySelector("#bidFormEmail").value = randomizeItem.email;
        document.querySelector("#productSelect").value = randomizeItem.product;
    }

    return {
        init: insertInUi,
    };
})();

generateTestData.init();