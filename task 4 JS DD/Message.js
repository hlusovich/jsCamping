const myLocaleStorage = { userName: 'Клусович Никита' };
class Message {
    constructor({ text, isPersonal = false, to = undefined }) {
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
module.exports = Message;