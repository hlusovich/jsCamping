class ActiveUsersView {
    constructor(containerId) {
        this.containerId = containerId;
    }
    display(activeUsers) {
        const userList = document.getElementById(this.containerId);
        const fragment = document.createDocumentFragment();
        activeUsers.map(activeUser => {
            const user = document.createElement("div");
            user.classList.add("user");
            const userIcon = document.createElement("div");
            userIcon.classList.add("user-img", userLogo.createUserIconColor(activeUser));
            userIcon.innerText = userLogo.createUserIconText(activeUser);
            const userName = document.createElement("div");
            userName.innerText = activeUser;
            user.appendChild(userIcon);
            user.appendChild(userName);
            fragment.appendChild(user);
        });
        userList.innerHTML="";
        userList.appendChild(fragment);
    }

}