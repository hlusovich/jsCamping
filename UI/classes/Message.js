class Message {
    constructor({text, isPersonal = false, to = undefined}, author) {
        this.author = author;
        this.createdAt = new Date();
        this.id = new Date().toString();
        this.isPersonal = isPersonal;
        this.to = to;
        this.text = text;
    }

}