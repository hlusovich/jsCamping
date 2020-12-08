/* eslint-disable no-unused-vars */
class Controller {
    constructor() {
        this.errorPage = new ErrorPageVIew();
        this.chatApiService = new ChatApiService("https://jslabdb.datamola.com/");
        this.userLogo = new UserLogos();
        this.notification = new Notification();
        this.userLogo.createUserIconColor('Js Camping');
        this.headerView = new HeaderView('profile', this.userLogo);
        this.messagesView = new MessagesView('messages-list', this.userLogo);
        this.UsersView = new UsersListView('users-list', this.userLogo);
        this.chatHeaderView = new ChatHeaderView('chat-header');
        this.headerView.display();
        this.messageList = document.getElementById('messages-list');
        this.messageCount = 10;
        this.chatHeaderView.display('Js Camping', 'JC', this.userLogo.getColor('Js Camping'));
        this.checkedUserChat = 'Js Camping';
        this.userSearch = document.getElementById('user-search');
        this.allUsersListState = true;
        this.activeUsersList = document.querySelector('.users-types__onlain');
        this.addMessageButton = document.getElementById('add-msg-btn');
        this.main = document.getElementById('main');
        this.usersBlock = document.getElementById('users-block');
        this.messagesBlock = document.getElementById('messages');
        this.chatInput = document.getElementById('chat-input');
        this.headerLogo = document.getElementById('header-logo');
        this.header = document.getElementById("header");
        this.messageList = document.getElementById('messages-list');
        this.messageInput = document.getElementById('message-input');
        this.messageBtn = document.getElementById('message-btn');
        this.allUsersList = document.querySelector('.users-types__all');
        this.userSearch = document.getElementById('user-search');
        this.filterAuthor = document.getElementById('filter-author');
        this.filterText = document.getElementById('filter-text');
        this.filterDateFrom = document.getElementById('filter-from');
        this.filterDateTo = document.getElementById('filter-to');
        this.filterBtnSubmit = document.getElementById('filter__btn-submit');
        this.filterBtnCancel = document.getElementById('filter__btn-cancel');
        this.userList = document.getElementById('users-list');
        this.notificationCheckInName = document.getElementById("notification-check-in-name");
        this.notificationCheckInPassword = document.getElementById("notification-check-in-password");
        this.notificationCheckInPasswordsIsSame = document.getElementById("notification-check-in-passwords-is-same");
        this.notificationSignInName = document.getElementById("notification-sign-in-name");
        this.notificationSignInPassword = document.getElementById("notification-sign-in-password");
        this.signInFormButton = document.getElementById("sign-in-form-btn");
        this.checkInFormButton = document.getElementById("check-in-form-btn");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.profile = document.getElementById("profile");
        this.burgerMenu = document.querySelector(".mobile__burger-menu");
        this.filters = document.querySelector(".filters");
        this.mobileSearch = document.getElementById("mobile-search");
        this.id = null;
        this.editFlag = false;
        this.to = "";
        this.isPrivate = false;
    }

    async start() {
        try {
            this.showUsers("users");
        } catch (e) {
            this.errorPage.display()
        }
        this.addMessageButton.addEventListener("click", () => {
            this.showMessages({}, 0, 10, true);
        });
        this.setCurrentUser(localStorage.getItem("user") || null);
        this.userSearch.addEventListener("input", (e) => {
            if (this.allUsersListState) {
                this.showUsers("users", e.target.value);
            } else {
                this.showUsers("activeUsers", e.target.value);
            }
        });
        this.mobileSearch.addEventListener("click", () => {
            this.filters.classList.toggle("filters-mobile_active");
        });
        this.activeUsersList.addEventListener("click", () => {
            this.allUsersListState = false;
            this.chooseUsersList();
            this.showUsers("activeUsers");
        });
        this.allUsersList.addEventListener("click", () => {
            this.allUsersListState = true;
            this.chooseUsersList();
            this.showUsers("users");
        });
        this.headerLogo.addEventListener("click", () => {
            this.showMainPage();
        });
        this.mobileMenu.addEventListener("click", () => {
            this.burgerMenu.classList.toggle("mobile__burger-menu_active");
            this.profile.classList.toggle("profile-mobile_active");
        });
        document.forms[1].name.addEventListener("change", () => {
                this.validateName(document.forms[1].name.value, this.notificationCheckInName);
            }
        );
        document.forms[1].name.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].password.addEventListener("change", () => {
                this.validatePassword(document.forms[1].password.value, this.notificationCheckInPassword);
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].password.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].passwordAgain.addEventListener("change", () => {
                this.validatePassword(document.forms[1].passwordAgain.value, this.notificationCheckInPassword);
                this.isPasswordsSame(document.forms[1].password.value, document.forms[1].passwordAgain.value, this.notificationCheckInPasswordsIsSame);
            }
        );
        document.forms[1].passwordAgain.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.checkInFormButton, document.forms[1].name.value, document.forms[1].password.value, document.forms[1].passwordAgain.value);
            }
        );
        document.forms[1].addEventListener("submit", async (event) => {
            event.preventDefault();
            if (this.addUser(document.forms[1].name.value.trim())) {
                try {
                    const formData = new FormData();
                    formData.append("name", document.forms[1].name.value.trim());
                    formData.append("pass", document.forms[1].password.value);
                    await this.chatApiService.isAuth(formData, "register");
                    await this.chatApiService.isAuth(formData, "login");
                    localStorage.setItem("user", document.forms[1].name.value.trim());
                    this.toDoAfterValidation("поздравляю,вы успешно зарегистрировались");
                    document.forms[1].name.value = "";
                    document.forms[1].password.value = "";
                    document.forms[1].passwordAgain.value = "";
                } catch (e) {
                    this.makeSound("assets/sounds/уведомление.mp3");
                    this.notification.showNotification({text: `Ошибка регистрации +${e.message}`, succesfull: false});
                }
            } else {
                this.makeSound("assets/sounds/уведомление.mp3");
                this.notification.showNotification({text: "такой пользователь уже зарегистрирован", succesfull: false});
            }
        });
        document.forms[0].name.addEventListener("change", () => {
                this.validateName(document.forms[0].name.value, this.notificationSignInName);
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].name.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].password.addEventListener("change", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].password.addEventListener("input", () => {
                this.toggleDisabledFormButton(this.signInFormButton, document.forms[0].name.value, document.forms[0].password.value);
            }
        );
        document.forms[0].addEventListener("submit", async (e) => {
            e.preventDefault();
            if (this.chatApiService.getUser(document.forms[0].name.value.trim())) {
                try {
                    const formData = new FormData;
                    formData.append("name", document.forms[0].name.value.trim());
                    formData.append("pass", document.forms[0].password.value);
                    await this.chatApiService.isAuth(formData, "login");
                    localStorage.setItem("user", document.forms[0].name.value.trim());
                    this.toDoAfterValidation("вы успешно вошли");
                    document.forms[0].name.value = "";
                    document.forms[0].password.value = "";
                } catch (e) {
                    this.notification.showNotification({text: e.message, succesfull: false});
                }
            } else {
                this.makeSound("assets/sounds/уведомление.mp3");
                this.notification.showNotification({
                    text: "такой пользователь еще не зарегистрирован",
                    succesfull: false
                });
            }

        });
        this.header.addEventListener("click", async (e) => {
            if (e.target.id === 'exit-btn') {
                this.removeUser();
            } else if (e.target.id === "check-in") {
                this.checkIn();
            } else if (e.target.id === 'sign-in') {
                this.singIn();
            }
        });
        this.messageList.addEventListener("click", (e) => {
            if (e.target.parentNode.classList.value === "message__delete-btn") {
                this.removeMessage(e.target.parentNode.getAttribute("id"));
            } else if (e.target.parentNode.classList.value === "message__edit-btn") {
                this.id = e.target.parentNode.getAttribute("id");
                this.messageInput.value = this.chatApiService.getText(this.id).text;
                this.editFlag = true;
            }

        });
        this.messageBtn.addEventListener("click", () => {
            if (this.messageInput.value) {
                if (this.editFlag) {
                    this.editMessage({text: this.messageInput.value, isPersonal: this.isPrivate, to: this.to});
                    this.id = null;
                    this.messageInput.value = "";
                    this.editFlag = false;
                } else if (this.to) {
                    this.addMessage({
                        text: this.messageInput.value,
                        isPersonal: this.isPrivate,
                        to: this.to,
                        author: localStorage.getItem("user")
                    });
                    this.messageInput.value = "";
                } else {
                    this.addMessage({text: this.messageInput.value, isPersonal: false, to: undefined,});
                    this.messageInput.value = "";
                }
            }
        });
        this.filterText.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterDateTo.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterAuthor.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterDateTo.value, this.filterText.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterDateFrom.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateTo.value, this.filterText.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterDateTo.addEventListener('input', (e) => {
            if (this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel, e, this.filterDateFrom.value, this.filterText.value, this.filterAuthor.value)) {
                this.clearFiltersFields();
            }

        });
        this.filterBtnSubmit.addEventListener("click", () => {
            this.showMessages({
                author: this.filterAuthor.value, text: this.filterText.value,
                dateTo: this.filterDateTo.value ? new Date(Date.parse(this.filterDateTo.value)) : "",
                dateFrom: this.filterDateFrom.value ? new Date(Date.parse(this.filterDateFrom.value)) : "",
            });
        });
        this.filterBtnCancel.addEventListener("click", () => {
            this.clearFiltersFields();
        });
        this.userList.addEventListener("click", async (e) => {
            if (e.target.classList[0] === "user-img" || e.target.classList[0] === "user_name") {
                const userName = e.target.classList[0] === "user-img" ? e.target.nextSibling.innerText : e.target.innerText;
                const userLogoInner = this.userLogo.createUserIconText(userName);
                const userLogoColor = this.userLogo.createUserIconColor(userName);
                this.setChechedUserChat(userName);
                this.showMessages();
                this.createChatHeaderLogo(userName, userLogoInner, userLogoColor);
                if (userName === "Js Camping") {
                    this.to = "";
                    this.isPrivate = false;
                } else {
                    this.to = userName;
                    this.isPrivate = true;
                }
                this.allUsersListState = true;
                this.chooseUsersList();
                this.showUsers("users");
            }
        });
        this.showMessages();
    }

    setChechedUserChat(name) {
        this.checkedUserChat = name;
    }

    setCurrentUser(user) {
        if (user) {
            this.messageInput.classList.remove('message-input_disabled');
            this.messageInput.placeholder = 'Введите ваше сообщение...';
            this.messageInput.disabled = false;
            this.messageBtn.classList.remove('chat-messages-button_hide');
            this.headerView.display(user);
            this.showMessages();
        }
    }

    async removeUser() {
        try {
            this.headerView.display();
            this.messageInput.classList.remove('message-input_disabled');
            this.messageInput.placeholder = 'Только зарегистрированный пользователь может писать сообщения...';
            this.messageInput.disabled = true;
            this.messageBtn.classList.add('chat-messages-button_hide');
            this.messageList.innerHTML = '';
            await this.chatApiService.logOut();
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            this.showMessages();
            this.showUsers("users");
            this.allUsersListState = true;
            this.chooseUsersList();
        } catch (e) {
            this.errorPage.display();
        }

    }

    async addMessage({text, isPersonal = false, to}) {
        try {
            const response = await this.chatApiService.createMessage({
                text,
                isPersonal,
                to,
                author: localStorage.getItem("user")
            });
            if (+response.status > 400) {
                throw new Error();
            }
            this.messageCount += 1;
            await this.showMessages();
        } catch (e) {
            console.log(666)
            this.errorPage.display();
        }

    }

    async editMessage({text, isPersonal = false, to}) {
        try {
            const response = await this.chatApiService.editMessage({text, isPersonal, to}, this.id);
            if (+response.status > 400) {
                throw new Error();
            }
            this.showMessages();
        } catch (e) {
            this.errorPage.display();
        }
    }

    async removeMessage(id) {
        try {
            const response = await this.chatApiService.deleteMessage(id)
            this.showMessages();
            if (+response.status > 400) {
                throw new Error();
            }
        } catch (e) {
            this.errorPage.display();
        }


    }

    async showMessages(filterConfig = {}, skip = 0, top = 10, pagination = false) {
        if (this.getMessagesTimeout) {
            clearInterval(this.getMessagesTimeout);
        }
        if (!Object.keys(filterConfig).length && pagination) {
            this.messageCount += top;
        }
        if (this.checkedUserChat === 'Js Camping') {
            this.getMessagesTimeout = setInterval(async () => {
                const messages = await this.chatApiService.getPage(0, this.messageCount, filterConfig);
                this.messageList.innerHTML = "";
                this.messagesView.display(messages.map(item => new Message(item, item.author)), localStorage.getItem("user"));
            }, 1500);
        } else {
            this.getMessagesTimeout = setInterval(async () => {
                const messages = await this.chatApiService.getPage(0, this.messageCount, filterConfig, true, localStorage.getItem("user"), this.checkedUserChat);
                this.messageList.innerHTML = "";
                this.messagesView.display(messages.map(item => new Message(item, item.author)), localStorage.getItem("user"));
            }, 1500);
        }
    }


    async showUsers(usersType, searchString) {
        if (this.getUsersTimeout) {
            clearInterval(this.getUsersTimeout);
        }
        this.getUsersTimeout = setInterval(async () => {
            try {
                await this.chatApiService.getUsers();
                const users = this.chatApiService[usersType];
                if (searchString) {
                    this.UsersView.display(users.filter((item) => item.name !== localStorage.getItem("user") &&
                        item.name.toLowerCase().startsWith(searchString.toLowerCase())), this.checkedUserChat);
                } else {
                    this.UsersView.display(users.filter((item) => item.name !== localStorage.getItem("user")), this.checkedUserChat);
                }
            } catch (e) {
                this.errorPage.display();
            }
        }, 2000)
    }

    addUser(user) {
        if (this.chatApiService.canAppendUser(user)) {
            this.showUsers("users");
            return true;
        }
        return false;
    }

    getUser(user) {
        if (this.chatApiService.getUser(user)) {
            this.showUsers("users");
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

    chooseUsersList() {
        this.userSearch.value = "";
        if (this.allUsersListState) {
            this.allUsersList.classList.add("users-active");
            this.activeUsersList.classList.remove("users-active");
        } else {
            this.activeUsersList.classList.add("users-active");
            this.allUsersList.classList.remove("users-active");
        }

    }

    checkIn() {
        this.usersBlock.style.display = "none";
        this.messagesBlock.style.display = "none";
        this.chatInput.style.display = "none";
        document.forms[1].style.display = "flex";
        document.forms[0].style.display = "none";
        this.main.classList.add("main-form");
    }

    singIn() {
        this.usersBlock.style.display = "none";
        this.messagesBlock.style.display = "none";
        this.chatInput.style.display = "none";
        document.forms[0].style.display = "flex";
        document.forms[1].style.display = "none";
        this.main.classList.add("main-form");
    }

    showMainPage() {
        this.usersBlock.style.display = "flex";
        this.messagesBlock.style.display = "flex";
        this.chatInput.style.display = "flex";
        document.forms[0].style.display = "none";
        document.forms[1].style.display = "none";
        this.main.classList.remove("main-form");
    }

    clearFiltersFields() {
        this.filterDateTo.value = "";
        this.filterDateFrom.value = "";
        this.filterText.value = "";
        this.filterAuthor.value = "";
        this.showMessages({
            author: this.filterAuthor.value, text: this.filterText.value,
            dateTo: this.filterDateTo.value,
            dateFrom: this.filterDateFrom.value,
        });
        this.changeFilterButtonsState(this.filterBtnSubmit, this.filterBtnCancel);
    }

    validateName(value, notification = false) {
        if (value.trim().split(" ").length === 2) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;

    }

    validatePassword(value, notification = false) {
        if (value.trim().length > 5) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;
    }

    isPasswordsSame(password, passwordAgain, notification = false) {
        if (password === passwordAgain) {
            if (notification) {
                notification.style.opacity = 0;
            }
            return true;
        }
        if (notification) {
            notification.style.opacity = 1;
        }
        return false;
    }

    toggleDisabledFormButton(button, name, password, passwordAgain = password) {
        if (name && this.validateName(name) && password && this.validatePassword(password) && passwordAgain && this.validatePassword(passwordAgain) && this.isPasswordsSame(password, passwordAgain)) {
            button.classList.remove("form__button_disabled");
            button.disabled = false;
            return true;

        }
        button.classList.add("form__button_disabled");
        button.disabled = true;
        return false;

    }

    makeSound(patch) {
        const audio = new Audio();
        audio.src = patch;
        audio.autoplay = true;
    }

    toDoAfterValidation(message) {
        this.setCurrentUser(localStorage.getItem("user"));
        this.showMainPage();
        this.allUsersListState = true;
        this.chooseUsersList();
        this.showUsers("users");
        this.toggleDisabledFormButton(this.checkInFormButton);
        this.makeSound("assets/sounds/вход.mp3");
        this.notification.showNotification({
            text: message,
            succesfull: true
        });
    }

}
