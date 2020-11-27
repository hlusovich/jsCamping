const monthArray = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Cентября", "Октября", "Ноября", "Декабря"];
const messages = [
    {
        id: '1',
        text: 'Привет!',
        createdAt: new Date('2020-10-10T23:10:05').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '2',
        text: 'Привет!',
        createdAt: new Date('2020-10-10T23:10:04').toString(),
        author: 'Богдан Навсекайло',
        isPersonal: false,
    },
    {
        id: '3',
        text: 'Привет!',
        createdAt: new Date('2020-10-12T23:13:01').toString(),
        author: 'Яна Ярошевич',
        isPersonal: false,
    },
    {
        id: '4',
        text: 'А через js надо изменять HTML?!',
        createdAt: new Date('2020-10-12T23:22:11').toString(),
        author: 'Вероника Кор',
        isPersonal: false,
    },
    {
        id: '5',
        text: 'Нет пока занятия ознакомительные!',
        createdAt: new Date('2020-10-16T00:10:02').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '6',
        text: 'Нет пока занятия ознакомительные!',
        createdAt: new Date('2020-10-14T00:08:09').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '7',
        text: 'Лекция уже кстати на гугл диске',
        createdAt: new Date('2020-10-12T00:09:00').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '8',
        text: 'О можно мoтать',
        createdAt: new Date('2020-10-12T00:14:08').toString(),
        author: 'Виктор Винницкий',
        isPersonal: false,
    },
    {
        id: '9',
        text: 'Может тогда перенесем на пораньше?',
        createdAt: new Date('2020-10-13T01:00:00').toString(),
        author: 'Клусович Никита',
        isPersonal: false,
    },
    {
        id: '10',
        text: 'Пофиксил ехтра таски',
        createdAt: new Date('2020-10-13T02:00:00').toString(),
        author: 'Клусович Никита',
        isPersonal: true,
        to: 'Евгений Жибрик',
    },
    {
        id: '11',
        text: 'Указыай что именно',
        createdAt: new Date('2020-10-13T03:00:01').toString(),
        author: 'Евгений Жибрик',
        isPersonal: true,
        to: 'Клусович Никита',
    },
    {
        id: '12',
        text: 'Там на стрим пустите))',
        createdAt: new Date('2020-10-13T23:01:00').toString(),
        author: 'Js Camping',
        isPersonal: true,
        to: 'Евгений Жибрик',
    },
    {
        id: '13',
        text: 'Учитесь гуглить',
        createdAt: new Date('2020-10-13T23:00:00').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '14',
        text: 'Зацените кодеварс',
        createdAt: new Date('2020-10-12T23:05:01').toString(),
        author: 'Яна Ярошевич',
        isPersonal: false,
    },
    {
        id: '15',
        text: 'а где документ с домашками?',
        createdAt: new Date('2020-10-17T23:01:00').toString(),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '16',
        text: 'Вот тут по этой ссылочке ....',
        createdAt: new Date('2020-10-17T23:01:05').toString(),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '17',
        text: 'спасибо',
        createdAt: new Date('2020-10-12T23:02:01').toString(),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '18',
        text: 'не могла найти',
        createdAt: new Date('2020-10-12T23:22:00').toString(),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '19',
        text: 'когда стрим?можно на утренний?',
        createdAt: new Date('2020-10-12T23:40:00').toString(),
        author: 'Носик Кокосик',
        isPersonal: true,
        to: 'Js Camping',
    },
    {
        id: '20',
        text: 'через 20 минут',
        createdAt: new Date('2020-10-12T23:54:10').toString(),
        author: 'Js Camping',
        isPersonal: true,
        to: 'Носик Кокосик',
    },
];
const users = ["Js Camping", "Яна Ярошевич", "Виктор Виницкий", "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
    "Дэн Абрамов", "Богдан Навсекайло", "Александра Карпова", "Носик Кокосик", "Евгений Жибрик", "Клусович Никита"];
if (!sessionStorage.getItem('users')) {
    sessionStorage.setItem("users", JSON.stringify(users));
}
if (!sessionStorage.getItem('messages')) {
    sessionStorage.setItem("messages", JSON.stringify(messages));
}
const activeUsers = ["Js Camping", "Яна Ярошевич", 'Виктор Виннцкий', "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
];
const userLogo = new UserLogos();
userLogo.createUserIconColor("Js Camping");
const controller = new Controller();
controller.showMessages(0,20);
controller.showAllUsers();
let allUsers = true;
let id = null;
let editFlag = null;
let mouseClickEvent = new Event("click");
let isPrivate = false;
let personTo = false;
const addMessageButton = document.getElementById("add-msg-btn");
const messageList = document.getElementById("messages-list");
const messageInput = document.getElementById("message-input");
const messageBtn = document.getElementById("message-btn");
const allUsersList = document.querySelector(".users-types__all");
const activeUsersList = document.querySelector(".users-types__onlain");
const userSearch = document.getElementById("user-search");
const filterAuthor = document.getElementById("filter-author");
const filterText = document.getElementById("filter-text");
const filterDateFrom = document.getElementById("filter-from");
const filterDateTo = document.getElementById("filter-to");
const filterBtnSubmit = document.getElementById("filter__btn-submit");
const filterBtnCancel = document.getElementById("filter__btn-cancel");
const formBtn = document.getElementById("form-btn");
const usersBlock = document.getElementById("users-block");
const messagesBlock = document.getElementById("messages");
const main = document.getElementById("main");
const chatInput = document.getElementById("chat-input");
const headerLogo = document.getElementById("header-logo");
const signInFormBtn = document.getElementById("sign-in-btn");
const userList = document.getElementById("users-list");
controller.setCurrentUser("Клусович Никита", messageInput, messageBtn, messageList);
let signInBtn = document.getElementById("sign-in");
let exitBtn = document.getElementById("exit-btn");
let checkInButton = document.getElementById("check-in");

function checkOutFunction() {
    if (checkInButton) {
        signInBtn.removeEventListener("click", singIn);
        checkInButton.removeEventListener("click", checkIn);
    }
    controller.removeUser(undefined, messageInput, messageBtn, messageList);
    checkInButton = document.getElementById("check-in");
    signInBtn = document.getElementById("sign-in");
    checkInButton.addEventListener("click", () => {
        checkIn();
    });
    signInBtn.addEventListener("click",
        () => {
            singIn();
        }
    )

}

function singIn() {
    usersBlock.style.display = "none";
    messagesBlock.style.display = "none";
    chatInput.style.display = "none";
    document.forms[0].style.display = "flex";
    document.forms[1].style.display = "none";
    main.classList.add("main-form")

}

function checkIn() {
    usersBlock.style.display = "none";
    messagesBlock.style.display = "none";
    chatInput.style.display = "none";
    document.forms[1].style.display = "flex";
    document.forms[0].style.display = "none";
    main.classList.add("main-form");
}

function changeFilterButtonsState(e = false) {
    if (e && e.target.value.length) {
        filterBtnSubmit.disabled = false;
        filterBtnCancel.disabled = false;
        filterBtnSubmit.classList.remove("button-disabled");
        filterBtnCancel.classList.remove("button-disabled");
    } else {
        filterBtnSubmit.disabled = true;
        filterBtnCancel.disabled = true;
        filterBtnSubmit.classList.add("button-disabled");
        filterBtnCancel.classList.add("button-disabled");
    }

}

addMessageButton.addEventListener("click", () => {
    controller.showMessages();
});
messageList.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.value === "message__delete-btn") {
        controller.removeMessage(e.target.parentNode.getAttribute("id"));
    } else if (e.target.parentNode.classList.value === "message__edit-btn") {
        id = e.target.parentNode.getAttribute("id");
        const text = controller.model.get(id).text;
        messageInput.value = text;
        editFlag = true;
    }

});
messageBtn.addEventListener("click", () => {
    if (messageInput.value) {
        if (editFlag) {
            controller.editMessage(id, {text: messageInput.value, isPersonal: personTo, to: isPrivate});
            id = null;
            messageInput.value = "";
            editFlag = false;
        } else if (isPrivate) {
            controller.addMessage({text: messageInput.value, isPersonal: personTo, to: isPrivate}, messageList);
            messageInput.value = "";
        } else {
            controller.addMessage({text: messageInput.value});
            messageInput.value = "";
        }
    }

});
activeUsersList.addEventListener("click", () => {
    userSearch.value = "";
    allUsers = false;
    activeUsersList.classList.add("users-active");
    allUsersList.classList.remove("users-active");
    controller.showActiveUsers();
});
allUsersList.addEventListener("click", () => {
    userSearch.value = "";
    allUsers = true;
    allUsersList.classList.add("users-active");
    activeUsersList.classList.remove("users-active");
    controller.showAllUsers();
});
userSearch.addEventListener("input", (e) => {
    if (allUsers) {
        controller.showAllUsers(e.target.value);
    } else {
        controller.showActiveUsers(e.target.value);
    }

});
filterText.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterAuthor.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterDateFrom.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterDateTo.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterBtnSubmit.addEventListener("click", () => {
    messageList.innerHTML = "";
    controller.showMessages(0, 10, {
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value,
        dateFrom: filterDateFrom.value,
    });
});
filterBtnCancel.addEventListener("click", () => {
    filterDateTo.value = "";
    filterDateFrom.value = "";
    filterText.value = "";
    filterAuthor.value = "";
    controller.showMessages(0, 10, {
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value,
        dateFrom: filterDateFrom.value,
    });
    changeFilterButtonsState();

});


exitBtn.addEventListener("click", () => {
    checkOutFunction();
});

headerLogo.addEventListener("click", () => {
    usersBlock.style.display = "flex";
    messagesBlock.style.display = "flex";
    chatInput.style.display = "flex";
    document.forms[0].style.display = "none";
    document.forms[1].style.display = "none";
    main.classList.remove("main-form")
});


formBtn.addEventListener("click", (event) => {
    event.preventDefault();
    controller.addUser(document.forms[0].name.value);
    exitBtn.removeEventListener("click", checkOutFunction);
    controller.setCurrentUser(document.forms[0].name.value, messageInput, messageBtn, messageList);
    usersBlock.style.display = "flex";
    messagesBlock.style.display = "flex";
    chatInput.style.display = "flex";
    document.forms[0].style.display = "none";
    document.forms[1].style.display = "none";
    main.classList.remove("main-form");
    exitBtn = document.getElementById("exit-btn");
    exitBtn.addEventListener("click", () => {
        checkOutFunction();
    })
});
signInFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    controller.addUser(document.forms[1].name.value);
    exitBtn.removeEventListener("click", checkOutFunction);
    controller.setCurrentUser(document.forms[1].name.value, messageInput, messageBtn, messageList);
    usersBlock.style.display = "flex";
    messagesBlock.style.display = "flex";
    chatInput.style.display = "flex";
    document.forms[0].style.display = "none";
    document.forms[1].style.display = "none";
    main.classList.remove("main-form");
    exitBtn = document.getElementById("exit-btn");
    exitBtn.addEventListener("click", () => {
        checkOutFunction();
    })
});
userList.addEventListener("click", (e) => {
    const userName = e.target.nextSibling.innerText;
    const userLogoInner = userLogo.createUserIconText(e.target.nextSibling.innerText);
    const userLogoColor = userLogo.createUserIconColor(e.target.nextSibling.innerText)
    if (e.target.classList[0] === "user-img") {
        controller.getPrivateMessages(e.target.nextSibling.innerText, messageList);
        controller.createChatHeaderLogo(userName, userLogoInner, userLogoColor);
    }
    if (userName === "Js Camping") {
        isPrivate = false;
        personTo = null;
    } else {
        isPrivate = userName;
        personTo = true;
    }
});


