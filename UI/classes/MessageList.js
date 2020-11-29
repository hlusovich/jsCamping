/* eslint-disable no-unused-vars */
class MessageList {
    static filterObj = {
        author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
        text: (item, text) => !text || item.text.toLowerCase().includes(text.toLowerCase()),
        dateTo: (item, dateTo) => !dateTo || item.createdAt < dateTo,
        dateFrom: (item, dateFrom) => !dateFrom || item.createdAt > dateFrom,
    };
    static getPrivate = (item, currentUser, checkedUsesName) => {
        if ((item.author === currentUser && item.to === checkedUsesName) || (item.author === checkedUsesName && item.to === currentUser)) {
            return true;
        }
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

    constructor() {
        this._msgs = JSON.parse(sessionStorage.getItem('messages') ?? '[]')
            .map(i => {i.createdAt = new Date(Date.parse(i.createdAt));
            return i;
        }).map(item=>new Message(item,item.author));
        this._user = null;
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

    changeUser(user) {
        this._user = user;
        return true;

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
    getPage(skip = 0, top = 10, filterConfig = {}, personalMessages, currentUser, checkedUsesName) {
        console.dir(filterConfig)
        const filterNames = Object.keys(filterConfig);
        const visibleMessages = this._msgs
            .filter((item) => filterNames
                .every((name) => MessageList.filterObj[name](item, filterConfig[name])));
        if (personalMessages) {
            return visibleMessages.filter((item) => MessageList.getPrivate(item, currentUser, checkedUsesName))
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(skip, top + skip)
                .reverse();
        } else {
            return visibleMessages
                .filter((item) => !item.isPersonal || (item.author === this._user && item.isPersonal === false))
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(skip, top + skip)
                .reverse();
        }
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
        const message = new Message(msg, this.user);
        if (MessageList.validate(message)) {
            const messages = JSON.parse(sessionStorage.getItem('messages') ?? '[]').map(i => {
                i.createdAt = new Date(Date.parse(i.createdAt));
                return i;
            });
            messages.push(message);
            sessionStorage.setItem("messages", JSON.stringify(messages));
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
            const messages = JSON.parse(sessionStorage.getItem('messages') ?? '[]').map(i => {
                i.createdAt = new Date(Date.parse(i.createdAt));
                return i;
            });
            sessionStorage.setItem("messages", JSON.stringify(messages.filter((item) => item.id !== id)));
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
        if (oldMessage.author !== this.user) {
            return false;
        }
        const changeMessageParams = (oldMsg) => {
            oldMsg.text = msg.text ? msg.text : oldMsg.text;
            oldMsg.isPersonal = 'isPersonal' in msg ? msg.isPersonal : oldMsg.isPersonal;
            if (msg.isPersonal && msg.to) {
                oldMsg.isPersonal = msg.isPersonal;
                oldMsg.to = msg.to;
            } else if (msg.isPersonal === false) {
                oldMsg.isPersonal = msg.isPersonal;
            }
            if (oldMsg.isPersonal === false && oldMsg.to) {
                delete oldMsg.to;
            }
            return oldMsg;
        };
        const newMessage = changeMessageParams(oldMessage);
        newMessage.prototype = Message.prototype;
        if (MessageList.validate(newMessage)) {
            this._msgs = this._msgs.map((item) => (item.id === id ? newMessage : item));
            const messages = JSON.parse(sessionStorage.getItem('messages') ?? '[]').map(i => {
                i.createdAt = new Date(Date.parse(i.createdAt));
                return i;
            });
            sessionStorage.setItem("messages", JSON.stringify(this._msgs));
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
