
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
const isPrivate=(item)=> {
    if ((item.author === 'Клусович Никита' && item.to === 'Евгений Жибрик') || (item.author === 'Евгений Жибрик' && item.to === 'Клусович Никита')) {
        return true;
    }
};
console.log(messages.filter(i=>isPrivate(i)))