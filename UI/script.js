const myLocaleStorage = {userName: 'Клусович Никита'};

class UserLogos {
    constructor(colorMap = {}) {
        this.colorMap = colorMap;
    }

    createUserIconColor(user) {
        const colorsList = ["red", "orange", "purple", "yellow", "red", "green", "blue"];
        const colorNumber = Math.floor(Math.random() * colorsList.length);
        if (this.colorMap[user]) {
            return this.colorMap[user];
        }
        this.colorMap[user] = colorsList[colorNumber];
        return this.colorMap[user]
    }

    createUserIconText(user) {
        const iconText = user.split(" ");
        return iconText[0][0] + iconText[1][0];
    }

}

const userLogos = new UserLogos();

class Message {
    constructor({text, isPersonal = false, to = undefined}) {
        this._author = myLocaleStorage.userName;
        this._createdAt = new Date();
        this._id = new Date().toString();
        this.isPersonal = isPersonal;
        this.to = to;
        this.text = text;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        return false;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        return false;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        return false;
    }
}

class MessageList {
    static filterObj = {
        author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
        text: (item, text) => !text || item.text.toLowerCase().includes(text.toLowerCase()),
        dateTo: (item, dateTo) => !dateTo || item.createdAt < dateTo,
        dateFrom: (item, dateFrom) => !dateFrom || item.createdAt > dateFrom,
    };

    /**
     * validate using parameter msg.
     * @param {object} msg - message with required fields author, id,text, createdAt.
     *      {Date} createdAt - creation date.
     *      {string} id -  msg id.
     *      {string} author - author name.
     *      {string} text - msg text
     * if msg contains field isPersonal which is equals true, msg must contains field to.
     *      {boolean} isPersonal - it equals true, if it private message, and false if public.
     *      {string} to -  name of the person to who the message is intended for.
     * @returns {boolean} -true, if all fields have passed validation , in another
     * cases returns false.
     */
    static validate(message) {
        const validateObj = {
            text: (msg) => msg.text && typeof msg.text === 'string' && msg.text.length <= 200,
            id: (msg) => msg.id && typeof msg.id === 'string',
            createdAt: (msg) => msg.createdAt && msg.createdAt instanceof Date,
            author: (msg) => msg.author && typeof msg.author === 'string',
            isPersonal: (msg) => {
                if ((msg.isPersonal === false && !msg.to)
                    || (msg.isPersonal && msg.to && typeof msg.to === 'string')) {
                    return typeof msg.isPersonal === 'boolean';
                }
                return false;
            },
        };
        return Object.keys(validateObj).every((name) => validateObj[name](message));
    }

    constructor(msgs) {
        this._msgs = msgs;
        this._user = myLocaleStorage.userName;
    }

    get messages() {
        return this._msgs;
    }

    set messages(value) {
        return false;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        return false;
    }

    /**
     * getPage using params and filter config.
     * @param {number} skip - count of msgs to skip in a filtered list.
     * @param {number} top -max count of msgs to return.
     * @param {object}filterConfig - filter config object, supports:
     *      {Date} dateFrom - min date.
     *      {Date} dateFrom - max date.
     *      {string} author -author name.
     *      {string} text - msg text
     * @returns {Array} of Message objects
     */
    getPage(skip = 0, top = 10, filterConfig = {}) {
        const filterNames = Object.keys(filterConfig);
        const visibleMessages = this._msgs
            .filter((item) => filterNames
                .every((name) => MessageList.filterObj[name](item, filterConfig[name])));
        return visibleMessages
            .filter((item) => !item.isPersonal || (item.author === this._user || item.to === this._user))
            .sort((a, b) => a.createdAt - b.createdAt)
            .slice(skip, top + skip);
    }

    /**
     *getPage using param id.
     * @param {string}id - of array element ,which we want to find.
     * @returns {object} - Message with id which equal parameter id which was passed.
     */
    get(id) {
        return this._msgs.find((item) => item.id === id);
    }

    /**
     * add using params msg.
     * @param {object} msg - object with  required field text,it can
     * also contain fields isPersonal and to.
     *       {string} text - message text.
     *       {boolean} isPersonal  - if this field contains  true,
     *       then this object must contains field to.
     *       {string} to - name of the person to whom the message
     *       is being sent.
     * @returns {boolean}
     */

    add(msg) {
        const message = new Message(msg);
        if (MessageList.validate(message)) {
            this._msgs.push(message);
            return true;
        }
        return false;
    }

    /**
     * remove using param id.
     * @param {string} id - of array element ,which we want to delete.
     * @returns {boolean} -  true ,if such a message exists and active
     * user name equals to field name in this message.
     * in other cases, return false
     */

    remove(id) {
        if (this.get(id) && this.get(id).author === this._user) {
            this._msgs = this._msgs.filter((item) => item.id !== id);
            return true;
        }
        return false;
    }

    /**
     * edit using param id and  object msg.
     * @param {string} id - of array element ,which we want to edit.
     * @param {object} msg - with fields which we want to edit.You can change
     * all fields except:author,id,createdAt.
     * @returns {boolean} -  true,if such a message exists and active user
     * name equals to field name in this message and the new message is correct .
     * in other cases, return false
     */

    edit(id, msg) {
        const oldMessage = this.get(id);
        if (oldMessage.author !== this._user) {
            return false;
        }
        const changeMessageParams = (oldMsg) => {
            const newMsg = {...oldMsg};
            newMsg.text = msg.text ? msg.text : newMsg.text;
            newMsg.isPersonal = 'isPersonal' in msg ? msg.isPersonal : newMsg.isPersonal;
            if (msg.isPersonal && msg.to) {
                newMsg.isPersonal = msg.isPersonal;
                newMsg.to = msg.to;
            } else if (msg.isPersonal === false) {
                newMsg.isPersonal = msg.isPersonal;
            }
            if (newMsg.isPersonal === false && newMsg.to) {
                delete newMsg.to;
            }
            return newMsg;
        };
        const newMessage = changeMessageParams(oldMessage);
        if (MessageList.validate(newMessage)) {
            this._msgs = this._msgs.map((item) => (item.id === id ? newMessage : item));
            return true;
        }
        return false;
    }

    /**
     * addAll using parametr msgs. Add all msgs (Array<Messages>) elements that passed validation.
     * @param {Array} msgs - array of Message.
     * @returns {Array<Message>} -array of messages that failed validation.
     */

    addAll(msgs) {
        const incorrectMessages = [];
        const correctMessages = [];
        msgs.map((item) => (MessageList.validate(item) ? correctMessages : incorrectMessages)
            .push(item));
        this._msgs = [...this._msgs, ...correctMessages];
        return incorrectMessages;
    }

    /**
     * clear delete all Message from collection.
     */
    clear() {
        this._msgs = [];
    }
}

class UserList {
    constructor(users, activeUsers) {
        this.users = users;
        this.activeUsers = activeUsers;
    }

}


class HeaderView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(user) {
        const container = document.getElementById(this.containerId);
        if (user) {
            const profileUserData = document.createElement("div");
            const profileUserName = document.createElement("div");
            const profileUserIcon = document.createElement("div");
            const exitButton = document.createElement("button");
            profileUserIcon.classList.add("user-img", userLogos.createUserIconColor(user));
            profileUserIcon.innerText = userLogos.createUserIconText(user);
            profileUserName.innerText = user;
            exitButton.innerText = "Выход";
            exitButton.id = "exit";
            exitButton.classList.add("profile__button");
            profileUserData.appendChild(profileUserIcon);
            profileUserData.appendChild(profileUserName);
            container.appendChild(profileUserData);
            container.appendChild(exitButton);
        } else {
            const signInButton = document.createElement("button");
            signInButton.innerText = "Войти";
            signInButton.id = "sign-in";
            signInButton.classList.add("profile__button");
            const checkInButton = document.createElement("button");
            checkInButton.innerText = "Регистрация";
            checkInButton.id = "check-in";
            checkInButton.classList.add("profile__button");
            container.appendChild(signInButton);
            container.appendChild(checkInButton);
        }
    }
}


class MessagesView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(msgs, user) {
        const messagesList = document.getElementById(this.containerId);
        const messageListFragment = document.createDocumentFragment();

        function createMessage(msg) {
            const message = document.createElement("div");
            const userImg = document.createElement("div");
            const messageData = document.createElement("div");
            const time = document.createElement("div");
            const text = document.createElement("div");
            const messageFragment = document.createDocumentFragment();
            userImg.innerText = userLogos.createUserIconText(msg.author);
            time.innerText = msg.createdAt;
            text.innerText = msg.text;
            userImg.classList.add("user-img", userLogos.createUserIconColor(msg.author));
            if (user === msg.author) {
                const userBtns = document.createElement("div");
                const editBtn = document.createElement("button");
                const deleteBtn = document.createElement("button");
                const deleteImg = document.createElement("img");
                const editImg = document.createElement("img");
                message.classList.add("messages-list__your-message");
                userBtns.classList.add("messages-list__your-message-edit-and-delete");
                editImg.src = "assets/images/edit.png";
                deleteImg.src = "assets/images/delete.png";
                editBtn.appendChild(editImg);
                deleteBtn.appendChild(deleteImg);
                userBtns.appendChild(editBtn);
                userBtns.appendChild(deleteBtn);
                messageData.classList.add('messages-list__your-message-data');
                messageData.appendChild(userBtns);
            } else {
                const author = document.createElement("div");
                author.innerText = msg.author;
                message.classList.add("messages-list__item");
                messageData.classList.add('messages-list__item-data');
                messageFragment.appendChild(author);
            }
            messageFragment.appendChild(text);
            messageFragment.appendChild(time);
            messageData.appendChild(messageFragment);
            if (user === msg.author) {
                message.appendChild(messageData);
                message.appendChild(userImg);
            } else {
                message.appendChild(userImg);
                message.appendChild(messageData);
            }

            messageListFragment.appendChild(message);

        }

        msgs.map(item => createMessage(item));
        messagesList.appendChild(messageListFragment);
    }

}

class UserLogo {
    constructor(colorMap = {}) {
        this.colorMap = colorMap;
    }

    createUserIconColor(user) {
        const colorsList = ["red", "orange", "purple", "yellow", "red", "green", "blue"];
        const colorNumber = Math.floor(Math.random() * colorsList.length);
        if (this.colorMap[user]) {
            return this.colorMap[user];
        }
        this.colorMap[user] = colorsList[colorNumber];
        return this.colorMap[user]
    }

    createUserIconText(user) {
        const iconText = user.split(" ");
        return iconText[0][0] + iconText[1][0];
    }

}

class ActiveUsersView {
    constructor(containerId) {
        this.containerId = containerId;
    }

}

class FilterView {
    constructor(containerId) {
        this.containerId = containerId;
    }

}

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
        to: 'Евгений Жибрак',
    },
    {
        id: '11',
        text: 'Указыай что именно',
        createdAt: new Date('2020-10-13T03:00:01'),
        author: 'Евгений Жибрак',
        isPersonal: true,
        to: 'Клусович Никита',
    },
    {
        id: '12',
        text: 'Там на стрим пустите))',
        createdAt: new Date('2020-10-13T23:01:00'),
        author: 'Js Camping',
        isPersonal: true,
        to: 'Евгений Жибрак',
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
