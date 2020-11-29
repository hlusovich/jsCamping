class UserList {
    constructor(users, activeUsers) {
        this._users =JSON.parse(sessionStorage.getItem('users') ?? '[]');
        this._activeUsers = activeUsers;
    }

    get users() {
        return this._users;
    }

    set users(value) {
        return;
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
            return true;
        }
        return false;
    }
    getUser(user){
        if(this.users.find(item=>item===user)){
            this.users.push(user);
            return true;
        }
        return  false;
    }
}
