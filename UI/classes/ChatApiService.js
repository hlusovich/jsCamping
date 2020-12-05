class ChatApiService {
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

    constructor(domen) {
        this.domen = domen;
        this._users = null;
        this._activeUsers = null;
    }

    get users() {
        return this._users;
    }

    set users(value) {
        return false;
    }

    get activeUsers() {
        return this._activeUsers
    }

    set activeUsers(value) {
        return;
    }

    async _GETandDELMethods(url, method) {
        await fetch(url, {
            method,
            AUTHORIZATION: localStorage.getItem("token"),
        })
    }

    async _PUTandPOSTMethods(url, method, body = {}) {
        try {
            const response = await fetch(url, {
                method,
                AUTHORIZATION: localStorage.getItem("token"),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
        } catch (e) {

        }
    }

    async getPage(skip = 0, top = 10, filterConfig = {}, personalMessages, currentUser, checkedUsesName) {
        try {
            const url = this.domen + `messages?skip=${skip}&top=${top}`;
            const messages = await this._GETandDELMethods(url, "GET").then(data => data.json());
            const filterNames = Object.keys(filterConfig);
            const visibleMessages = messages
                .filter((item) => filterNames
                    .every((name) => MessageList.filterObj[name](item, filterConfig[name])));
            if (personalMessages) {
                return visibleMessages.filter((item) => MessageList.getPrivate(item, currentUser, checkedUsesName))
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(skip, top + skip)
                    .reverse();
            } else {
                return visibleMessages
                    .filter((item) => !item.isPersonal || (item.author === localStorage.getItem("user") && item.isPersonal === false))
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(skip, top + skip)
                    .reverse();
            }
        } catch (e) {
        }
    }

    async deleteMessage(id) {
        try {
            const url = this.domen + `messages/${id}`;
            const request = await this._GETandDELMethods(url, "DELETE");
            return true;
        } catch (e) {
            return false;
        }
    }

    async createMessage(body) {
        try {
            const url = this.domen + `auth/messages`;
            const postUser = await this._PUTandPOSTMethods(url, "POST", body);
            return true;
        } catch (e) {
            return false;
        }
    }


    async getUsers() {
        try {
            const url = this.domen + `users`;
            const users = await this._GETandDELMethods(url, "GET").then(data => data.json());
            this._users = users.filter(item => item.name);
            this._activeUsers = users.filter(item => item.isActive);
            return users;
        } catch (e) {

        }

    }

    async isAuth(user, path) {
        try {
            const url = this.domen + `auth/${path}`;
            const postUser = await this._PUTandPOSTMethods(url, "POST", user);
            localStorage.setItem("user", user.name);
            localStorage.setItem("token", postUser);
        } catch (e) {

        }
    }

    async signIn(user) {
        this.isAuth(user, "login")
    }

    async checkIn(user) {
        this.isAuth(user, "register")
    }

    appendUser(user) {
        if (!this.users.find(item => item.name === user)) {
            return true;
        }
        return false;
    }

    getUser(user) {
        if (this.users.find(item => item.name === user)) {
            return true;
        }
        return false;
    }

    async logOut() {
        try {
            const url = this.domen + `auth/logout`;
            const logOut = await this._PUTandPOSTMethods(url, "POST");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } catch (e) {

        }

    }

    async editMessage(body, id) {
        try {
            const url = this.domen + `auth/messages/${id}`;
            const postUser = await this._PUTandPOSTMethods(url, "PUT", body);
            return true;
        } catch (e) {
            return false;
        }
    }
}