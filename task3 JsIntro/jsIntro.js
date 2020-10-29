"use strict";
const chatModule = (function () {
    let messages = [
        {
            id: '1',
            text: 'Привет!',
            createdAt: new Date('2020-10-12T23:10:05'),
            author: 'Js Camping',
            isPersonal: false,
        },
        {
            id: '2',
            text: 'Привет!',
            createdAt: new Date('2020-10-12T23:10:04'),
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
            createdAt: new Date('2020-10-12T00:10:02'),
            author: 'Js Camping',
            isPersonal: false,
        },
        {
            id: '6',
            text: 'Нет пока занятия ознакомительные!',
            createdAt: new Date('2020-10-12T00:08:09'),
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
            author: 'Js Camping',
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
            to: "Js Camping",
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

    function getMessages(skip = 0, top = 10, filterConfig) {
        let visibleMessages = messages.slice(skip, top).sort((a, b) => a.createdAt - b.createdAt);
        if (filterConfig) {
            visibleMessages = filterConfig.author ? visibleMessages.filter(item => item.author.includes(filterConfig.author)) : visibleMessages;
            visibleMessages = filterConfig.dateFrom ? visibleMessages.filter(item => item.createdAt > filterConfig.dateFrom && item.createdAt < filterConfig.dateTo) : visibleMessages;
            visibleMessages = filterConfig.text ? visibleMessages.filter(item => item.text.includes(filterConfig.text)) : visibleMessages;
        }
        return visibleMessages;
    }

    function getMessage(id) {
        return messages.find(item => item.id === id);
    }

    function validateMessage(msg) {
        if (msg.id && typeof msg.id === "string" && msg.text && typeof msg.text === "string" && msg.createdAt && msg.createdAt.__proto__ === Date.prototype && msg.author && typeof msg.author === "string") {
            if ("isPersonal" in msg) {
                return typeof msg.isPersonal === "boolean";
            }
            return true;
        }
        return false;
    }

    function addMessage(msg) {
        if (validateMessage(msg)) {
            messages.push(msg);
            return true;
        }
        return false;
    }

    function removeMessage(id) {
        if (messages.some(item => item.id === id)) {
            messages = messages.filter(item => item.id !== id);
            return true;
        }
        return false;
    }

    function editMessage(id, msg) {
        let changeMessageParams = (oldMsg) => {
            let newMsg = {...oldMsg};
            newMsg.text = msg.text ? newMsg.text = msg.text : newMsg.text;
            newMsg.isPersonal = "isPersonal" in msg ? newMsg.isPersonal = msg.isPersonal : newMsg.isPersonal;
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
        let newMessage = changeMessageParams(getMessage(id));
        if (validateMessage(newMessage)) {
            messages = messages.map(item => {
                    if (item.id === id) {
                        return newMessage;
                    }
                    return item;
                }
            );
            return true;
        } else {
            return false;
        }

    }

    return {
        getMessages,
        removeMessage,
        addMessage,
        getMessage,
        editMessage,
        validateMessage,
    };
})();
console.log(`всего сообщений ${chatModule.getMessages(0, Infinity).length}`);
console.log(`валидацию из них проходит  ${chatModule.getMessages(0, Infinity).map(item => chatModule.validateMessage(item))}`);
console.log(`получаем первые 10 по умолчанию `);
console.log(chatModule.getMessages());
console.log(`получаем вторые 10 `);
console.log(chatModule.getMessages(10, 20));
console.log(`получаем из первых 10 те, где в тексте есть Привет `);
console.log(chatModule.getMessages(0, 10, {text: "Привет"}));
console.log(`получаем из первых 10 те, где в тексте есть Привет! и автор Яна`);
console.log(chatModule.getMessages(0, 10, {text: "Привет!", author: 'Ярошевич'}));
console.log(`получаем из всех те, что написанны от 23 ночи до 23:30 ночи 2020-10-12 числа`);
console.log(chatModule.getMessages(0, 20, {
    dateFrom: new Date('2020-10-12T23:00:00'),
    dateTo: new Date('2020-10-12T23:30:00')
}));
console.log(`сейчас сообщений ${chatModule.getMessages(0, 20).length}`);
console.log("удаление сообщения с индекос  два");
console.log(chatModule.removeMessage("2"));
console.log(`теперь сообщений ${chatModule.getMessages(0, 20).length}`);
console.log(chatModule.getMessages(0, 20));
console.log("получить сообщение с индексом 3");
console.log(chatModule.getMessage("3"));
console.log("Добавить сообщение");
console.log(chatModule.addMessage({
    id: '21',
    text: 'Новое сообщение',
    createdAt: new Date('2020-10-12T23:10:04'),
    author: 'Богдан Навсекайло',
    isPersonal: false,
}));
console.log(`теперь сообщений ${chatModule.getMessages(0, 20).length}`);
console.log(chatModule.getMessages(0, 20));
console.log("изменяем текст сообщения с индексом 4 с валидными параметрами (текст про Игру престолов)");
console.log(chatModule.editMessage("4", {text: "Вам понравился сериал Игра Престолов?"}));
console.log(chatModule.getMessages());
console.log("изменяем сообщение с индексом 5 с невалидными параметрами");
console.log(chatModule.editMessage("5", {text: 132}));
console.log(chatModule.getMessages());
console.log("сделаем id20 сообщение из приватного публичныым");
console.log(chatModule.getMessage("20"));
console.log(chatModule.editMessage("20", {isPersonal: true, to: "Стэнли Кубрик"}));
console.log(chatModule.getMessage("20"));



