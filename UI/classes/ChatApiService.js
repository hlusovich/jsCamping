class ChatApiService {
    constructor(domen,errorPage) {
        this.domen = domen;
        this._users = null;
        this._activeUsers = null;
        this.messages = [];
        this.errorPage = errorPage;
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
        return await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
    }

    async _POSTandPUTmethods(url, method, body) {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body),
        });
        return response;

    }

    async isAuthMethods(url, method, body = {}) {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: body
        });
        return response;
    }

    async getPage(skip = 0, top = 10, filterConfig = {}, personalMessages, currentUser, checkedUsesName) {
        try {
            const author = filterConfig.author ? `&author=${filterConfig.author}` : '';
            const dateTo = filterConfig.dateTo ? `&dateTo=${"" + filterConfig.dateTo.getFullYear() + (filterConfig.dateTo.getMonth() + 1) + filterConfig.dateTo.getDate()}` : '';
            const dateFrom = filterConfig.dateFrom ? `&dateFrom=${"" + filterConfig.dateFrom.getFullYear() + (filterConfig.dateFrom.getMonth() + 1) + filterConfig.dateFrom.getDate()}` : '';
            const text = filterConfig.text ? `&text=${filterConfig.text}` : '';
            const url = personalMessages ? this.domen + `messages?skip=${skip}&top=${top}&isPersonal=${true}&personalToFrom=${checkedUsesName}` + author + dateFrom + dateTo + text :
                this.domen + `messages?skip=${skip}&top=${top}&isPersonal=${false}` + author + dateFrom + dateTo + text;
            this.messages = await this._GETandDELMethods(url, "GET").then(data => data.json());
            if(this.messages.error){
                this.messages = [];
            }
            return this.messages
                .reverse();
        } catch (e) {
            this.errorPage.display();
        }
    }

    async deleteMessage(id) {
        const url = this.domen + `messages/${id}`;
        const request = await this._GETandDELMethods(url, "DELETE");
        return request;
    }

    async createMessage(body) {
        const url = this.domen + `messages`;
        const postMessage = await this._POSTandPUTmethods(url, "POST", body);
        return postMessage;
    }

    async getUsers() {
        const url = this.domen + `users`;
        const users = await this._GETandDELMethods(url, "GET").then(data => data.json());
        this._users = [{name: "Js Camping", isActive: true}, ...users.filter(item => item.name)];
        this._activeUsers = this._users.filter(item => item.isActive);
        return users;
    }


    async isAuth(user, path) {
        const url = this.domen + `auth/${path}`;
        const postUser = await this.isAuthMethods(url, "POST", user);
        return postUser;
    }

    async logOut() {
        const url = this.domen + `auth/logout`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response;
    }

    async editMessage(body, id) {
        const url = this.domen + `messages/${id}`;
        try {
            const editMessage = await this._POSTandPUTmethods(url, "PUT", body);
            return editMessage;
        } catch (e) {
            return false;
        }
    }

    canAppendUser(user) {
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

    getText(id) {
        return this.messages.find((item) => item.id === id);
    }
}