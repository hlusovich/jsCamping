class Message {
    constructor({text, isPersonal = false, to = undefined}, author) {
        this._author = author;
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