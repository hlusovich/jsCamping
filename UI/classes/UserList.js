class UserList {
    constructor(activeUsers) {
        this._users = [];
        this._activeUsers = [];
        this.restore();
    }

    get users() {
        return this._users;
    }

    set users(value) {
        this._activeUsers = value.filter(item => item.isActive);
        return this._users = value;
    }

    get activeUsers() {
        return this._activeUsers;
    }

    set activeUsers(value) {
        return;
    }

    /**
     *add unique user.
     * @param {string} user - user name.
     * @returns {boolean} - if it is a new user adds it to the list of users.
     */
    appendUser(user) {
        if (!this.users.find(item => item === user)) {
            this.users.push(user);
            this.save(user);
            return true;
        }
        return false;
    }

    getUser(user) {
        if (this.users.find(item => item === user)) {
            return true;
        }
        return false;
    }

    restore() {
        this._users = JSON.parse(sessionStorage.getItem('users') ?? '[]');
    }

    save(user) {
        const parseUsers = JSON.parse(sessionStorage.getItem('users'));
        sessionStorage.setItem('users', JSON.stringify([...parseUsers, user]));
    }
}
