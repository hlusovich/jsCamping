/* eslint-disable no-unused-vars */
class ChatHeaderView {
  constructor(idSelector) {
    this.chatHeader = document.getElementById(idSelector);
  }

  display(user, userInner, color) {
    this.chatHeader.innerHTML = '';
    const userLogo = document.createElement('div');
    userLogo.classList.add('messages-header__chat-name');
    userLogo.classList.add(color);
    userLogo.innerHTML = userInner;
    const userLogoText = document.createElement('span');
    userLogoText.innerText = user;
    this.chatHeader.appendChild(userLogo);
    this.chatHeader.appendChild(userLogoText);
  }
}
