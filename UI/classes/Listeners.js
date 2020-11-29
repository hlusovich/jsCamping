function checkOutFunction() {
    if (checkInButton) {
        signInBtn.removeEventListener("click", singIn);
        checkInButton.removeEventListener("click", checkIn);
    }
    controller.removeUser(undefined, messageInput, messageBtn);
    checkInButton = document.getElementById("check-in");
    signInBtn = document.getElementById("sign-in");
    checkInButton.addEventListener("click", () => {
        checkIn();
    });
    signInBtn.addEventListener("click",
        () => {
            singIn();
        }
    )

}

function singIn() {
    usersBlock.style.display = "none";
    messagesBlock.style.display = "none";
    chatInput.style.display = "none";
    document.forms[0].style.display = "flex";
    document.forms[1].style.display = "none";
    main.classList.add("main-form")

}

function checkIn() {
    usersBlock.style.display = "none";
    messagesBlock.style.display = "none";
    chatInput.style.display = "none";
    document.forms[1].style.display = "flex";
    document.forms[0].style.display = "none";
    main.classList.add("main-form");
}


addMessageButton.addEventListener("click", () => {
    controller.showMessages();
});
messageList.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.value === "message__delete-btn") {
        controller.removeMessage(e.target.parentNode.getAttribute("id"));
    } else if (e.target.parentNode.classList.value === "message__edit-btn") {
        id = e.target.parentNode.getAttribute("id");
        const text = controller.model.get(id).text;
        messageInput.value = text;
        editFlag = true;
    }

});
messageBtn.addEventListener("click", () => {
    if (messageInput.value) {
        if (editFlag) {
            controller.editMessage(id, {text: messageInput.value, isPersonal: personTo, to: isPrivate}, personTo);
            id = null;
            messageInput.value = "";
            editFlag = false;
        } else if (isPrivate) {
            controller.addMessage({text: messageInput.value, isPersonal: personTo, to: isPrivate});
            messageInput.value = "";
            messageList.scrollTo(0, messageList.scrollHeight);
        } else {
            controller.addMessage({text: messageInput.value});
            messageList.scrollTo(0, messageList.scrollHeight);
            messageInput.value = "";
        }
    }

});
activeUsersList.addEventListener("click", () => {
    userSearch.value = "";
    allUsers = false;
    activeUsersList.classList.add("users-active");
    allUsersList.classList.remove("users-active");
    controller.showActiveUsers();
});
allUsersList.addEventListener("click", () => {
    userSearch.value = "";
    allUsers = true;
    allUsersList.classList.add("users-active");
    activeUsersList.classList.remove("users-active");
    controller.showAllUsers();
});
userSearch.addEventListener("input", (e) => {
    if (allUsers) {
        controller.showAllUsers(e.target.value);
    } else {
        controller.showActiveUsers(e.target.value);
    }

});
filterText.addEventListener('input', (e) => {
    if (controller.changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e, filterDateFrom.value, filterDateTo.value, filterAuthor.value)) {
        filterBtnCancel.dispatchEvent(mouseClickEvent);
    }

});
filterAuthor.addEventListener('input', (e) => {
    if (controller.changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e, filterDateFrom.value, filterDateTo.value, filterText.value)) {
        filterBtnCancel.dispatchEvent(mouseClickEvent);
    }

});
filterDateFrom.addEventListener('input', (e) => {
    if (controller.changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e, filterDateTo.value, filterText.value, filterAuthor.value)) {
        filterBtnCancel.dispatchEvent(mouseClickEvent);
    }

});
filterDateTo.addEventListener('input', (e) => {
    if (controller.changeFilterButtonsState(filterBtnSubmit, filterBtnCancel, e, filterDateFrom.value, filterText.value, filterAuthor.value)) {
        filterBtnCancel.dispatchEvent(mouseClickEvent);
    }

});
filterBtnSubmit.addEventListener("click", () => {
    messageList.innerHTML = "";
    controller.showMessages({
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value ? new Date(Date.parse(filterDateTo.value)) : "",
        dateFrom: filterDateFrom.value ? new Date(Date.parse(filterDateFrom.value)) : "",
    });
});
filterBtnCancel.addEventListener("click", () => {
    filterDateTo.value = "";
    filterDateFrom.value = "";
    filterText.value = "";
    filterAuthor.value = "";
    controller.showMessages({
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value,
        dateFrom: filterDateFrom.value,
    });
    controller.changeFilterButtonsState(filterBtnSubmit, filterBtnCancel);
});

exitBtn.addEventListener("click", () => {
    checkOutFunction();
});

headerLogo.addEventListener("click", () => {
    usersBlock.style.display = "flex";
    messagesBlock.style.display = "flex";
    chatInput.style.display = "flex";
    document.forms[0].style.display = "none";
    document.forms[1].style.display = "none";
    main.classList.remove("main-form")
});


checkInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (controller.addUser(document.forms[1].name.value)) {
        exitBtn.removeEventListener("click", checkOutFunction);
        controller.setCurrentUser(document.forms[1].name.value, messageInput, messageBtn);
        headerLogo.dispatchEvent(mouseClickEvent);
        exitBtn = document.getElementById("exit-btn");
        exitBtn.addEventListener("click", () => {
            checkOutFunction();
        });
        allUsersList.dispatchEvent(mouseClickEvent);
    }
    else{
        alert("такой пользователь уже зарегистрирован");
    }
});
signInFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (controller.getUser(document.forms[0].name.value)) {
        exitBtn.removeEventListener("click", checkOutFunction);
        controller.setCurrentUser(document.forms[0].name.value, messageInput, messageBtn);
        headerLogo.dispatchEvent(mouseClickEvent);
        exitBtn = document.getElementById("exit-btn");
        exitBtn.addEventListener("click", () => {
            checkOutFunction();
        });
        allUsersList.dispatchEvent(mouseClickEvent);
    }
    else {
        alert("такой пользователь еще не зарегистрирован");
    }

});
userList.addEventListener("click", (e) => {
    let userName = null;
    if (e.target.classList[0] === "user-img" || e.target.classList[0] === "user_name") {

        userName = e.target.classList[0] === "user-img" ? e.target.nextSibling.innerText : e.target.innerText;
        const userLogoInner = userLogo.createUserIconText(userName);
        const userLogoColor = userLogo.createUserIconColor(userName);
        controller.setChechedUserChat(userName);
        controller.getPrivateMessages();
        controller.createChatHeaderLogo(userName, userLogoInner, userLogoColor);
    }
    if (userName === "Js Camping") {
        isPrivate = false;
        personTo = null;
        controller.setChechedUserChat("Js Camping");
        controller.getPrivateMessages();
    } else {
        isPrivate = userName;
        personTo = true;
    }
    messageList.scrollTo(0, messageList.scrollHeight);
    allUsersList.dispatchEvent(mouseClickEvent);
});

