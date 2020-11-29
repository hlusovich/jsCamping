/*eslint-disable no-unused-vars*/
class HeaderView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    /**
     * adds to elements with id===containerId depending on whether the user value is true.
     * @param {string || undefined} user - name of the validated user or undefined if user unvalidated.
     */

    display(user) {
        const container = document.getElementById(this.containerId);
        container.innerHTML = "";
        if (user) {
            const profileUserData = document.createElement("div");
            const profileUserName = document.createElement("div");
            const profileUserIcon = document.createElement("div");
            const exitButton = document.createElement("button");
            exitButton.id = "exit-btn";
            profileUserIcon.classList.add("user-img", userLogo.createUserIconColor(user));
            profileUserIcon.innerText = userLogo.createUserIconText(user);
            profileUserName.innerText = user;
            exitButton.innerText = "Выход";
            exitButton.classList.add("profile__button");
            profileUserData.appendChild(profileUserIcon);
            profileUserData.appendChild(profileUserName);
            container.appendChild(profileUserData);
            container.appendChild(exitButton);
        } else {
            const signInButton = document.createElement("button");
            signInButton.innerText = "Войти";
            signInButton.id = "sign-in";
            signInButton.classList.add("profile__button");
            const checkInButton = document.createElement("button");
            checkInButton.innerText = "Регистрация";
            checkInButton.id = "check-in";
            checkInButton.classList.add("profile__button");
            container.appendChild(signInButton);
            container.appendChild(checkInButton);
        }
    }
}