class Controller {
    constructor() {
        this.model = new MessageList();
        this.headerView = new HeaderView("profile");
        this.messagesView = new MessagesView("messages-list");
        this.UsersView = new ActiveUsersView("users-list");
        this.userList = new UserList(users, activeUsers);
        this.mainTemplateView = new MainTemplateView("mainPage-template");
        this.mainTemplateView.display();
        this.headerView.display();
        this.messageList = document.getElementById("messages-list");
        this.messageCount = 0;
    }

    setCurrentUser(user, input, button, messageList) {
        if (this.model.changeUser(user)) {
            input.classList.remove("message-input_disabled");
            input.placeholder = "Введите ваше сообщение...";
            input.disabled = false;
            button.classList.remove("chat-messages-button_hide");
            this.headerView.display(user);
            messageList.innerHTML = "";
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    removeUser(user, input, button, messageList) {
        if (this.model.changeUser(null)) {
            this.headerView.display();
            input.classList.remove("message-input_disabled");
            input.placeholder = "Только зарегистрированный пользователь может писать сообщения...";
            input.disabled = true;
            button.classList.add("chat-messages-button_hide");
            this.messageList.innerHTML = "";
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    addMessage({text, isPersonal = false, to},messageList=[]) {
        if (this.model.add({text, isPersonal, to})) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messageCount += 1;
            if (isPersonal) {
                const isPrivate = (item) => {
                    if ((item.author === this.model.user && item.to === name) || (item.author === name && item.to === this.model.user)) {
                        return true;
                    }
                }
                this.messagesView.display(this.model.getPage(0, this.messageCount).filter(i=>isPrivate(i)), this.model.user);
                this.getPrivateMessages(to,messageList);
            } else {
                this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user)

            }
            this.messageList.scrollTo(0, this.messageList.scrollHeight);
        }

    }

    editMessage(id, {text, isPersonal = false, to}) {
        if (this.model.edit(id, {text, isPersonal, to})) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    removeMessage(id) {
        if (this.model.remove(id)) {
            const messagesList = document.getElementById("messages-list");
            messagesList.innerHTML = "";
            this.messageCount -= 1;
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    showMessages(skip = this.messageCount, top = 10, filterConfig = false) {
        this.messagesView.display(this.model.getPage(skip, top, filterConfig), this.model.user);
        if (!filterConfig) {
            this.messageCount += top;
        }
    }

    showActiveUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userList.activeUsers.filter(item => item !== this.model.user && item.startsWith(searchString)));
        } else {
            this.UsersView.display(this.userList.activeUsers.filter(item => item !== this.model.user));
        }

    }

    showAllUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userList.users.filter(item => item !== this.model.user && item.startsWith(searchString)));
        } else {
            this.UsersView.display(this.userList.users.filter(item => item !== this.model.user));
        }

    }

    addUser(user) {
        if (this.userList.appendUser(user)) {
            const parseUsers = JSON.parse(sessionStorage.getItem('users'));
            sessionStorage.setItem('users', JSON.stringify([...parseUsers, user]));
            this.showAllUsers();
        }
    }

    getPrivateMessages(name, messageList) {
        if (name === "Js Camping") {
            messageList.innerHTML="";
            this.showMessages(0,this.messageCount);
        } else {
            const isPrivate = (item) => {
                if ((item.author === this.model.user && item.to === name) || (item.author === name && item.to === this.model.user)) {
                    return true;
                }
            };
            messageList.innerHTML = "";
            this.messagesView.display(this.model.messages.filter(i => isPrivate(i)), this.model.user,true);
        }


    }
}
