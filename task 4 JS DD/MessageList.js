"use strict";
const Message = require('./Message');
const myLocaleStorage = { userName: 'Клусович Никита' };
class MessageList {
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
      text: (msg) => msg.text && typeof msg.text === 'string',
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
    const filterObj = {
      author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
      text: (item, text) => !text || item.text.toLowerCase().includes(text.toLowerCase()),
      dateTo: (item, dateTo) => !dateTo || item.createdAt < dateTo,
      dateFrom: (item, dateFrom) => !dateFrom || item.createdAt > dateFrom,
    };
    const filterNames = Object.keys(filterConfig);
    const visibleMessages = this._msgs
      .filter((item) => filterNames.every((name) => filterObj[name](item, filterConfig[name])));
    return visibleMessages
      .filter((item) => !item.isPersonal || (item.author === this._user || item.to === this._user))
      .sort((a, b) => a.createdAt - b.createdAt)
      .slice(skip, top);
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
      const newMsg = { ...oldMsg };
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
const messageList = new MessageList(messages);
console.log(messageList);
console.log(`всего сообщений ${messageList.getPage(0, Infinity).length}`);
console.log(`валидацию из них проходит  ${messageList.getPage(0, Infinity).map((item) => MessageList.validate(item))}`);
console.log('получаем первые 10 по умолчанию ');
console.log(messageList.getPage());
console.log('получаем вторые 10 ');
console.log(messageList.getPage(10, 20));
console.log('получаем первые 10 те, где в тексте есть Привет ');
console.log(messageList.getPage(0, 10, { text: 'Привет' }));
console.log('получаем из первых 10 те, где в тексте есть Привет! и автор Яна');
console.log(messageList.getPage(0, 10, { text: 'Привет!', author: 'Ярошевич' }));
console.log('получаем из всех те, что написанны от 23 ночи до 23:30 ночи 2020-10-12 числа');
console.log(messageList.getPage(0, 20, {
  dateFrom: new Date('2020-10-12T23:00:00'),
  dateTo: new Date('2020-10-12T23:30:00'),
}));
console.log(`сейчас сообщений ${messageList.getPage(0, 20).length}`);
console.log('удаление сообщения с индекос  два(оно не нашего пользователя)');
console.log(messageList.remove('2'));
console.log(`теперь сообщений ${messageList.getPage(0, 20).length}`);
console.log('удаление сообщения с индекос  10(оно  нашего пользователя)');
console.log(messageList.remove('10'));
console.log(`теперь сообщений ${messageList.getPage(0, 20).length}`);
console.log(messageList.getPage(0, 20));
console.log('получить сообщение с индексом 3');
console.log(messageList.get('3'));
console.log('Добавить сообщение');
console.log(messageList.add({ text: 'Новое сообщение с необычным текстом' }));
console.log(`теперь сообщений ${messageList.getPage(0, 20).length}`);
console.log(messageList.getPage(0, 20));
console.log('изменяем текст сообщения с индексом 4 с валидными параметрами (текст про Игру престолов), но оно не принадлежит нашему пользователю');
console.log(messageList.edit('4', { text: 'Вам понравился сериал Игра Престолов?' }));
console.log(messageList.getPage(0, 20));
console.log('изменяем текст сообщения с индексом 9 с валидными параметрами (текст про фильм с Фаррелом),оно  принадлежит нашему пользователю');
console.log(messageList.edit('9', { text: 'Я очень люблю фильм залечь на дно в Брюгге' }));
console.log(messageList.getPage(0, 20));
console.log('изменяем сообщение с индексом 5 с невалидными параметрами');
console.log(messageList.edit('5', { text: 132 }));
console.log(messageList.getPage());
console.log('сделаем id20 сообщение из приватного публичныым');
console.log(messageList.get('20'));
console.log(messageList.edit('20', { isPersonal: false }));
console.log(messageList.get('20'));
console.log('Чистим сообщения');
messageList.clear();
console.log(`теперь  сообщений ${messageList.getPage(0, Infinity).length}`);
console.log('Добавляем 5 сообщений все валидные');
const validMessagesList = [{
  id: '22',
  text: 'Пора в магазин!',
  createdAt: new Date('2020-10-10T23:10:05'),
  author: 'Js Camping',
  isPersonal: false,
},
{
  id: '23',
  text: 'Любите класическую музыку?!',
  createdAt: new Date('2020-10-16T23:10:04'),
  author: 'Богдан Навсекайло',
  isPersonal: false,
},
{
  id: '24',
  text: 'Вот бы тут был голосовой ввод',
  createdAt: new Date('2020-10-15T23:13:01'),
  author: 'Яна Ярошевич',
  isPersonal: false,
},
{
  id: '25',
  text: 'А через js надо изменять HTML?!',
  createdAt: new Date('2020-10-14T23:22:11'),
  author: 'Вероника Кор',
  isPersonal: false,
},
{
  id: '26',
  text: 'энергично!',
  createdAt: new Date('2020-10-17T00:10:02'),
  author: 'Js Camping',
  isPersonal: false,
}];
console.log(messageList.addAll(validMessagesList));
console.log(messageList.getPage(0, 10));
console.log('добавляем 4 сообщения 2 не валидных');
const halfValidMessagesList = [{
  id: 42, // не корректный тип данных в свойстве id
  text: 'Пора в магазин!',
  createdAt: new Date('2020-10-10T23:10:05'),
  author: 'Js Camping',
  isPersonal: false,
},
{
  id: '43',
  text: 'И что будем делать?',
  createdAt: new Date('2020-10-16T23:10:04'),
  isPersonal: false,
  // нет поля автор
},
{
  id: '44',
  text: 'Какая разнциа сорок третий ты в мессаг лист не попадешь',
  createdAt: new Date('2020-10-15T23:13:01'),
  author: 'Яна Ярошевич',
  isPersonal: false,
},
{
  id: '45',
  text: 'АХАХАХХАХАХХАХАХА',
  createdAt: new Date('2020-10-14T23:22:11'),
  author: 'Вероника Кор',
  isPersonal: false,
},
];
console.log(messageList.addAll(halfValidMessagesList));
console.log(messageList.getPage(0, 10));
console.log(`теперь длина равна ${messageList.messages.length}`);
