class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(msgs, user) {
    const messagesList = document.getElementById(this.containerId);
    const messageListFragment = document.createDocumentFragment();
    function createMessage(msg) {
      try {
        if (msg instanceof Message) {
          const message = document.createElement('div');
          const userImg = document.createElement('div');
          const messageData = document.createElement('div');
          const time = document.createElement('div');
          const text = document.createElement('div');
          const messageFragment = document.createDocumentFragment();
          userImg.innerText = userLogo.createUserIconText(msg.author);
          const date = new Date(Date.parse(msg.createdAt));
          time.innerText = `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`} 
            ${date.getDate()} ${monthArray[date.getMonth()]}`;
          text.innerText = msg.text;
          userImg.classList.add('user-img', userLogo.createUserIconColor(msg.author));
          if (user === msg.author) {
            const userBtns = document.createElement('div');
            const editBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            const deleteImg = document.createElement('img');
            const editImg = document.createElement('img');
            message.classList.add('messages-list__your-message');
            userBtns.classList.add('messages-list__your-message-edit-and-delete');
            time.classList.add('time');
            editImg.src = 'assets/images/edit.png';
            editBtn.classList.add('message__edit-btn');
            deleteImg.src = 'assets/images/delete.png';
            deleteBtn.classList.add('message__delete-btn');
            editBtn.appendChild(editImg);
            editBtn.setAttribute('id', msg.id);
            deleteBtn.appendChild(deleteImg);
            deleteBtn.setAttribute('id', msg.id);
            userBtns.appendChild(editBtn);
            userBtns.appendChild(deleteBtn);
            messageData.classList.add('messages-list__your-message-data');
            messageData.appendChild(userBtns);
          } else {
            const author = document.createElement('div');
            author.innerText = msg.author;
            message.classList.add('messages-list__item');
            messageData.classList.add('messages-list__item-data');
            messageFragment.appendChild(author);
          }
          messageFragment.appendChild(text);
          messageFragment.appendChild(time);
          messageData.appendChild(messageFragment);
          if (user === msg.author) {
            message.appendChild(messageData);
            message.appendChild(userImg);
          } else {
            message.appendChild(userImg);
            message.appendChild(messageData);
          }

          messageListFragment.appendChild(message);
        } else {
          throw new Error('msg not istance of class Message');
        }
      } catch (e) {
        alert(`неподходящий объект ${e}`);
      }
    }

    msgs.map((item) => createMessage(item));
    messagesList.prepend(messageListFragment);
  }
}
