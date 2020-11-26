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
const users = ["Js Camping", "Яна Ярошевич", "Виктор Виницкий", "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
    "Дэн Абрамов", "Богдан Навсекайло", "Александра Карпова", "Носик Кокосик", "Евгений Жибрак", "Клусович Никита"];
const activeUsers = ["Js Camping", "Яна Ярошевич", 'Виктор Виннцкий', "Илон Маск", "Марк Цукенберг", "Роберт Родригез",
];

class Controller {
    constructor() {
        this.model = new MessageList(messages);
        this.headerView = new HeaderView("profile");
        this.messagesView = new MessagesView("messages-list");
        this.activeUsersView = new ActiveUsersView("users-list");
        this.userList = new UserList(users, activeUsers);
        this.mainTemplateView = new MainTemplateView("mainPage-template");
        this.mainTemplateView.display();
        this.headerView.display();
        this.messageList = document.getElementById("messages-list");
        this.messageCount = 0;
    }

    setCurrentUser(user,input,button,messageList) {
        if (this.model.changeUser(user)) {
            input.classList.remove("message-input_disabled");
            input.placeholder="Введите ваше сообщение...";
            input.disabled = false;
            button.classList.remove("chat-messages-button_hide");
            this.headerView.display(user);
            messageList.innerHTML = "";
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }
    removeUser(user,input,button,messageList){
        this.headerView.display();
        input.classList.remove("message-input_disabled");
        input.placeholder="Только зарегистрированный пользователь может писать сообщения...";
        input.disabled = true;
        button.classList.add("chat-messages-button_hide");
        this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
    }

    addMessage({text, isPersonal = false, to}) {
        if (this.model.add({text, isPersonal, to})) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messageCount += 1;
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
            this.messageList.scrollTo(0, this.messageList.scrollHeight);
        }

    }

    editMessage(id, {text, isPersonal = false, to}) {
        if (this.model.edit(id, {text, isPersonal, to})) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    removeMessage(id) {
        if (this.model.remove(id)) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messageCount -= 1;
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    showMessages(skip=this.messageCount, top = 10, filterConfig = false) {
        this.messagesView.display(this.model.getPage(skip, top, filterConfig), this.model.user);
        if(!filterConfig){
            this.messageCount += top;}
    }
    showActiveUsers(searchString = false) {
        if (searchString) {
            this.activeUsersView.display(this.userList.activeUsers.filter(item => item !== this.model.user && item.startsWith(searchString)));
        } else {
            this.activeUsersView.display(this.userList.activeUsers.filter(item => item !== this.model.user));
        }

    }

    showAllUsers(searchString = false) {
        if (searchString) {
            this.activeUsersView.display(this.userList.users.filter(item => item !== this.model.user && item.startsWith(searchString)));
        } else {
            this.activeUsersView.display(this.userList.users.filter(item => item !== this.model.user));
        }

    }
}
