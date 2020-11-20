class MessagesView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(msgs, user) {
        const messagesList = document.getElementById(this.containerId);
        const messageListFragment = document.createDocumentFragment();
        const monthArray = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Cентября", "Октября", "Ноября", "Декабря"];

        function createMessage(msg) {
            const message = document.createElement("div");
            const userImg = document.createElement("div");
            const messageData = document.createElement("div");
            const time = document.createElement("div");
            const text = document.createElement("div");
            const messageFragment = document.createDocumentFragment();
            userImg.innerText = userLogo.createUserIconText(msg.author);
            time.innerText = `${msg.createdAt.getHours()}:${msg.createdAt.getMinutes() > 9 ? msg.createdAt.getMinutes() : "0" + msg.createdAt.getMinutes()} 
            ${msg.createdAt.getDate()} ${monthArray[msg.createdAt.getMonth()]}`;
            text.innerText = msg.text;
            userImg.classList.add("user-img", userLogo.createUserIconColor(msg.author));
            if (user === msg.author) {
                const userBtns = document.createElement("div");
                const editBtn = document.createElement("button");
                const deleteBtn = document.createElement("button");
                const deleteImg = document.createElement("img");
                const editImg = document.createElement("img");
                message.classList.add("messages-list__your-message");
                userBtns.classList.add("messages-list__your-message-edit-and-delete");
                time.classList.add("time");
                editImg.src = "assets/images/edit.png";
                deleteImg.src = "assets/images/delete.png";
                editBtn.appendChild(editImg);
                deleteBtn.appendChild(deleteImg);
                userBtns.appendChild(editBtn);
                userBtns.appendChild(deleteBtn);
                messageData.classList.add('messages-list__your-message-data');
                messageData.appendChild(userBtns);
            } else {
                const author = document.createElement("div");
                author.innerText = msg.author;
                message.classList.add("messages-list__item");
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
        }

        msgs.map(item => createMessage(item));
        messagesList.prepend(messageListFragment);

    }

}