const messages = [
  new Message({
    id: '1',
    text: 'Привет!',
    createdAt: new Date('2020-10-10T23:10:05').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '2',
    text: 'Привет!',
    createdAt: new Date('2020-10-10T23:10:04').toString(),
    isPersonal: false,
  }, 'Богдан Навсекайло'),
  new Message({
    id: '3',
    text: 'Привет!',
    createdAt: new Date('2020-10-12T23:13:01').toString(),
    isPersonal: false,
  }, 'Яна Ярошевич'),
  new Message({
    id: '4',
    text: 'А через js надо изменять HTML5?!',
    createdAt: new Date('2020-10-12T23:22:11').toString(),
    isPersonal: false,
  }, 'Вероника Кор'),
  new Message({
    id: '5',
    text: 'Нет пока занятия ознакомительные!',
    createdAt: new Date('2020-10-16T00:10:02').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '6',
    text: 'Нет пока занятия ознакомительные!',
    createdAt: new Date('2020-10-14T00:08:09').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '7',
    text: 'Лекция уже кстати на гугл диске',
    createdAt: new Date('2020-10-12T00:09:00').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '8',
    text: 'О можно мoтать',
    createdAt: new Date('2020-10-12T00:14:08').toString(),
    isPersonal: false,
  }, 'Виктор Винницкий'),
  new Message({
    id: '9',
    text: 'Может тогда перенесем на пораньше?',
    createdAt: new Date('2020-10-13T01:00:00').toString(),
    isPersonal: false,
  }, 'Клусович Никита'),
  new Message({
    id: '10',
    text: 'Пофиксил ехтра таски',
    createdAt: new Date('2020-10-13T02:00:00').toString(),
    isPersonal: true,
    to: 'Евгений Жибрик',
  }, 'Клусович Никита'),
  new Message({
    id: '11',
    text: 'Указыай что именно',
    createdAt: new Date('2020-10-13T03:00:01').toString(),
    isPersonal: true,
    to: 'Клусович Никита',
  }, 'Евгений Жибрик'),
  new Message({
    id: '12',
    text: 'Там на стрим пустите))',
    createdAt: new Date('2020-10-13T23:01:00').toString(),
    isPersonal: true,
    to: 'Евгений Жибрик',
  }, 'Js Camping'),
  new Message({
    id: '13',
    text: 'Учитесь гуглить',
    createdAt: new Date('2020-10-13T23:00:00').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '14',
    text: 'Зацените кодеварс',
    createdAt: new Date('2020-10-12T23:05:01').toString(),
    isPersonal: false,
  }, 'Яна Ярошевич'),
  new Message({
    id: '15',
    text: 'а где документ с домашками?',
    createdAt: new Date('2020-10-17T23:01:00').toString(),
    isPersonal: false,
  }, 'Носик Кокосик'),
  new Message({
    id: '16',
    text: 'Вот тут по этой ссылочке ....',
    createdAt: new Date('2020-10-17T23:01:05').toString(),
    isPersonal: false,
  }, 'Js Camping'),
  new Message({
    id: '17',
    text: 'спасибо',
    createdAt: new Date('2020-10-12T23:02:01').toString(),
    isPersonal: false,
  }, 'Носик Кокосик'),
  new Message({
    id: '18',
    text: 'не могла найти 2',
    createdAt: new Date('2020-10-12T23:22:00').toString(),
    isPersonal: false,
  }, 'Носик Кокосик'),
  new Message({
    id: '19',
    text: 'когда стрим?можно на утренний?',
    createdAt: new Date('2020-10-12T23:40:00').toString(),
    isPersonal: true,
    to: 'Яна Ярошевич',
  }, 'Носик Кокосик'),
  new Message({
    id: '20',
    text: 'через 20 минут',
    createdAt: new Date('2020-10-12T23:54:10').toString(),
    isPersonal: true,
    to: 'Носик Кокосик',
  }, 'Js Camping'),
];
const monthArray = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Cентября', 'Октября', 'Ноября', 'Декабря'];
const users = ['Js Camping', 'Яна Ярошевич', 'Виктор Виницкий', 'Илон Маск', 'Марк Цукенберг', 'Роберт Родригез',
  'Дэн Абрамов', 'Богдан Навсекайло', 'Александра Карпова', 'Носик Кокосик', 'Евгений Жибрик', 'Клусович Никита'];
if (!sessionStorage.getItem('users')) {
  sessionStorage.setItem('users', JSON.stringify(users));
}
if (!sessionStorage.getItem('messages')) {
  sessionStorage.setItem('messages', JSON.stringify(messages));
}
const activeUsers = ['Js Camping', 'Яна Ярошевич', 'Виктор Виннцкий', 'Илон Маск', 'Марк Цукенберг', 'Роберт Родригез',
];
