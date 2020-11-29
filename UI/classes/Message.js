/* eslint-disable no-unused-vars */
class Message {
  constructor({
    text, isPersonal = false, to = undefined, id = new Date().toString(), createdAt = new Date(),
  }, author) {
    this.author = author;
    this.createdAt = createdAt;
    this.id = id;
    this.isPersonal = isPersonal;
    this.to = to;
    this.text = text;
  }
}
