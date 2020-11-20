let messageCount = 0;
const users = ["Js Camping", "Яна Ярошевич", "Виктор Виницкий", "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
    "Дэн Абрамов", "Богдан Навсекайло", "Александра Карпова", "Носик Кокосик", "Евгений Жибрак", "Клусович Никита"];
const activeUsers = ["Js Camping", "Яна Ярошевич", 'Виктор Винницкий', "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
    "Дэн Абрамов", "Богдан Навсекайло", 'Евгений Жибрик', 'Клусович Никита', "Носик Кокосик"];
const messages = [
    {
        id: '1',
        text: 'Привет!',
        createdAt: new Date('2020-10-10T23:10:05'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '2',
        text: 'Привет!',
        createdAt: new Date('2020-10-10T23:10:04'),
        author: 'Богдан Навсекайло',
        isPersonal: false,
    },
    {
        id: '3',
        text: 'Привет!',
        createdAt: new Date('2020-10-12T23:13:01'),
        author: 'Яна Ярошевич',
        isPersonal: false,
    },
    {
        id: '4',
        text: 'А через js надо изменять HTML?!',
        createdAt: new Date('2020-10-12T23:22:11'),
        author: 'Вероника Кор',
        isPersonal: false,
    },
    {
        id: '5',
        text: 'Нет пока занятия ознакомительные!',
        createdAt: new Date('2020-10-16T00:10:02'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '6',
        text: 'Нет пока занятия ознакомительные!',
        createdAt: new Date('2020-10-14T00:08:09'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '7',
        text: 'Лекция уже кстати на гугл диске',
        createdAt: new Date('2020-10-12T00:09:00'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '8',
        text: 'О можно мoтать',
        createdAt: new Date('2020-10-12T00:14:08'),
        author: 'Виктор Винницкий',
        isPersonal: false,
    },
    {
        id: '9',
        text: 'Может тогда перенесем на пораньше?',
        createdAt: new Date('2020-10-13T01:00:00'),
        author: 'Клусович Никита',
        isPersonal: false,
    },
    {
        id: '10',
        text: 'Пофиксил ехтра таски',
        createdAt: new Date('2020-10-13T02:00:00'),
        author: 'Клусович Никита',
        isPersonal: true,
        to: 'Евгений Жибрик',
    },
    {
        id: '11',
        text: 'Указыай что именно',
        createdAt: new Date('2020-10-13T03:00:01'),
        author: 'Евгений Жибрик',
        isPersonal: true,
        to: 'Клусович Никита',
    },
    {
        id: '12',
        text: 'Там на стрим пустите))',
        createdAt: new Date('2020-10-13T23:01:00'),
        author: 'Js Camping',
        isPersonal: true,
        to: 'Евгений Жибрик',
    },
    {
        id: '13',
        text: 'Учитесь гуглить',
        createdAt: new Date('2020-10-13T23:00:00'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '14',
        text: 'Зацените кодеварс',
        createdAt: new Date('2020-10-12T23:05:01'),
        author: 'Яна Ярошевич',
        isPersonal: false,
    },
    {
        id: '15',
        text: 'а где документ с домашками?',
        createdAt: new Date('2020-10-17T23:01:00'),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '16',
        text: 'Вот тут по этой ссылочке ....',
        createdAt: new Date('2020-10-17T23:01:05'),
        author: 'Js Camping',
        isPersonal: false,
    },
    {
        id: '17',
        text: 'спасибо',
        createdAt: new Date('2020-10-12T23:02:01'),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '18',
        text: 'не могла найти',
        createdAt: new Date('2020-10-12T23:22:00'),
        author: 'Носик Кокосик',
        isPersonal: false,
    },
    {
        id: '19',
        text: 'когда стрим?можно на утренний?',
        createdAt: new Date('2020-10-12T23:40:00'),
        author: 'Носик Кокосик',
        isPersonal: true,
        to: 'Js Camping',
    },
    {
        id: '20',
        text: 'через 20 минут',
        createdAt: new Date('2020-10-12T23:54:10'),
        author: 'Js Camping',
        isPersonal: true,
        to: 'Носик Кокосик',
    },
];
const model = new MessageList(messages);
const headerView = new HeaderView("profile");
const messagesView = new MessagesView("messages-list");
const activeUsersView = new ActiveUsersView("users-list");
const userList = new UserList(users, activeUsers);
const messageList = document.getElementById("messages-list");

function setCurrentUser(user) {
    if (model.changeUser(user)) {
        headerView.display(user);
        const messagesList = document.getElementById("messages-list");
        messagesList.innerHTML = "";
        messagesView.display(model.getPage(0, messageCount), model.user);
    }
}

function addMessage({text, isPersonal = false, to}) {
    if (model.add({text, isPersonal, to})) {
        const messagesList = document.getElementById("messages-list");
        messagesList.innerHTML = "";
        messageCount += 1;
        messagesView.display(model.getPage(0, messageCount), model.user);
        messageList.scrollTo(0, messageList.scrollHeight);
    }

}

function editMessage(id, {text, isPersonal = false, to}) {
    if (model.edit(id, {text, isPersonal, to})) {
        const messagesList = document.getElementById("messages-list");
        messagesList.innerHTML = "";
        messagesView.display(model.getPage(0, messageCount), model.user);
    }
}

function removeMessage(id) {
    if (model.remove(id)) {
        const messagesList = document.getElementById("messages-list");
        messagesList.innerHTML = "";
        messageCount -= 1;
        messagesView.display(model.getPage(0, messageCount), model.user);
    }
}

function showMessages(skip, top = 10, filterConfig) {
    messagesView.display(model.getPage(messageCount, top, filterConfig), model.user);
    messageCount += top;
}

function showActiveUsers() {
    activeUsersView.display(userList.activeUsers);
}

setCurrentUser();
setCurrentUser("Клусович Никита");
showMessages();
showActiveUsers();
messageList.scrollTo(0, messageList.scrollHeight);
// имитация действий пользователя - вызовы методов addMessage, removeMessage, editMessage
addMessage({text: "добавленное сообщение, имитиация лисенера события"});
addMessage({text: "гурбангулы мухамедов открыл памятник алабаю"});
console.log("меняем юзера");
setCurrentUser("Js Camping");
addMessage({text: "звучит как скороговорка"});
addMessage({text: "добавленное сообщение, имитиация лисенера события2"});
editMessage('10', {text: "нужно зарегистрировать логотип"});
console.log("получаем еще 10 messages");
showMessages(10, 10);
console.log("удаляем сообщение с индексом 9");
