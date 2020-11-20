const colorsList = ["red", "orange", "purple", "yellow", "red", "green", "blue", "pink"];
class UserLogos {
    constructor(colorMap = {}) {
        this.colorMap = colorMap;
    }
    /**
     * return css class using parameter msg.
     * @param {string} user-which if present in the map is the key for the map,
     * in the other case, it becomes a key with a random color value.
     * @returns {string}  a value from the map.
     */
    createUserIconColor(user) {
        const colorNumber = Math.floor(Math.random() * colorsList.length);
        if (this.colorMap[user]) {
            return this.colorMap[user];
        }
        this.colorMap[user] = colorsList[colorNumber];
        return this.colorMap[user];
    }

    /**
     * returns the first letters of the user's first and last name.
     * @param {string} user- user name.
     * @returns {string} - the first letters of the user's first and last name.
     */
    createUserIconText(user) {
        const iconText = user.split(" ");
        return iconText[0][0] + iconText[1][0];
    }

}

const userLogo = new UserLogos();