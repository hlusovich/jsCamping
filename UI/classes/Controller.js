/* eslint-disable no-unused-vars */
class Controller {
    constructor() {
        this.model = new MessageList();
        this.headerView = new HeaderView('profile');
        this.messagesView = new MessagesView('messages-list');
        this.UsersView = new UsersListView('users-list');
        this.userList = new UserList(users, activeUsers);
        this.chatHeaderView = new ChatHeaderView('chat-header');
        this.headerView.display();
        this.messageList = document.getElementById('messages-list');
        this.messageCount = 10;
        this.chatHeaderView.display('Js Camping', 'JC', userLogo.getColor('Js Camping'));
        this.checkedUserChat = 'Js Camping';
    }

    setChechedUserChat(name) {
        this.checkedUserChat = name;
    }

    setCurrentUser(user, input, button) {
        if (this.model.changeUser(user)) {
            input.classList.remove('message-input_disabled');
            input.placeholder = 'Введите ваше сообщение...';
            input.disabled = false;
            button.classList.remove('chat-messages-button_hide');
            this.headerView.display(user);
            this.messageList.innerHTML = '';
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    removeUser(user, input, button) {
        if (this.model.changeUser(null)) {
            this.headerView.display();
            input.classList.remove('message-input_disabled');
            input.placeholder = 'Только зарегистрированный пользователь может писать сообщения...';
            input.disabled = true;
            button.classList.add('chat-messages-button_hide');
            this.messageList.innerHTML = '';
            this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
        }
    }

    addMessage({text, isPersonal = false, to}) {
        if (this.model.add({text, isPersonal, to})) {
            this.messageList.innerHTML = '';
            this.messageCount += 1;
            this.getPrivateMessages();
        }
    }

    editMessage(id, {text, isPersonal = false, to}) {
        if (this.model.edit(id, {text, isPersonal, to})) {
            this.messageList.innerHTML = '';
            this.getPrivateMessages();
        }
    }

    removeMessage(id) {
        if (this.model.remove(id)) {
            this.messageList.innerHTML = '';
            if (this.checkedUserChat !== 'Js Camping') {
                this.getPrivateMessages();
            } else {
                this.messagesView.display(this.model.getPage(0, this.messageCount), this.model.user);
            }
        }
    }

    showMessages(filterConfig = {}, skip = 0, top = 10) {
        if (!Object.keys(filterConfig).length) {
            this.messageList.innerHTML = '';
            this.messageCount += top;
        }
        this.getPrivateMessages(filterConfig);
    }

    showActiveUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userList.activeUsers.filter((item) => item !== this.model.user
                && item.toLowerCase().startsWith(searchString.toLowerCase())), this.checkedUserChat);
        } else {
            this.UsersView.display(this.userList.activeUsers.filter((item) => item !== this.model.user), this.checkedUserChat);
        }
    }

    showAllUsers(searchString = false) {
        if (searchString) {
            this.UsersView.display(this.userList.users.filter((item) => item !== this.model.user
                && item.toLowerCase().startsWith(searchString.toLowerCase())), this.checkedUserChat);
        } else {
            this.UsersView.display(this.userList
                .users.filter((item) => item !== this.model.user), this.checkedUserChat);
        }
    }

    addUser(user) {
        if (this.userList.appendUser(user)) {
            const parseUsers = JSON.parse(sessionStorage.getItem('users'));
            sessionStorage.setItem('users', JSON.stringify([...parseUsers, user]));
            this.showAllUsers();
            return true;
        }
        return false;
    }

    getUser(user) {
        if (this.userList.getUser(user)) {
            this.showAllUsers();
            return true;
        }
        return false;
    }

    createChatHeaderLogo(user, userInner, color) {
        this.chatHeaderView.display(user, userInner, color);
    }

    changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e = false, value1, value2, value3) {
        if (e && e.target.value.length) {
            filterBtnSubmit.disabled = false;
            filterBtnCancel.disabled = false;
            filterBtnSubmit.classList.remove('button-disabled');
            filterBtnCancel.classList.remove('button-disabled');
            return false;
        }
        if (!value1 && !value2 && !value3 && e && !e.target.value) {
            filterBtnSubmit.disabled = true;
            filterBtnCancel.disabled = true;
            filterBtnSubmit.classList.add('button-disabled');
            filterBtnCancel.classList.add('button-disabled');
            return true;
        }
    }

    getPrivateMessages(filterConfig = {}) {
        this.messageList.innerHTML = '';
        if (this.checkedUserChat === 'Js Camping') {
            this.messagesView
                .display(this.model.getPage(0, this.messageCount, filterConfig), this.model.user);
        } else {
            this.messagesView.display(this
                    .model.getPage(0,
                    this.messageCount,
                    filterConfig,
                    true,
                    this.model.user,
                    this.checkedUserChat),
                this.model.user);
        }
    }
}
