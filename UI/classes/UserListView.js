/* eslint-disable no-unused-vars */
class UsersListView {
    constructor(containerId, userLogo) {
        this.containerId = containerId;
        this.userLogo = userLogo;
    }

    display(activeUsers, checkedUserChat) {
        const userList = document.getElementById(this.containerId);
        const fragment = document.createDocumentFragment();
        activeUsers.map(activeUser => {
            const user = document.createElement("div");
            user.classList.add("user");
            if (activeUser === checkedUserChat) {
                user.classList.add("user_current");
            }
            const userIcon = document.createElement("div");
            userIcon.classList.add("user-img", this.userLogo.createUserIconColor(activeUser));
            userIcon.innerText = this.userLogo.createUserIconText(activeUser);
            const userName = document.createElement("div");
            userName.innerText = activeUser;
            userName.classList.add('user_name');
            user.appendChild(userIcon);
            user.appendChild(userName);
            fragment.appendChild(user);
        });
        userList.innerHTML = "";
        userList.appendChild(fragment);
    }

}