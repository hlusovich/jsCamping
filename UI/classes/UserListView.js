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
            if(activeUser.name){const user = document.createElement("div");
            user.classList.add("user");
            if (activeUser.name === checkedUserChat) {
                user.classList.add("user_current");
            }
            const userIcon = document.createElement("div");
            userIcon.classList.add("user-img", this.userLogo.createUserIconColor(activeUser.name));
            userIcon.innerText = this.userLogo.createUserIconText(activeUser.name);
            const userName = document.createElement("div");
            userName.innerText = activeUser.name;
            userName.classList.add('user_name');
            user.appendChild(userIcon);
            user.appendChild(userName);
            fragment.appendChild(user);}
        });
        userList.innerHTML = "";
        userList.appendChild(fragment);
    }

}