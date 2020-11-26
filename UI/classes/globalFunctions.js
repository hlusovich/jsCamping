const monthArray = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Cентября", "Октября", "Ноября", "Декабря"];
const controller = new Controller();
controller.showMessages();
controller.showAllUsers();
let allUsers = true;
let id = null;
let editFlag = null;
const addMessageButton = document.getElementById("add-msg-btn");
const messageList = document.getElementById("messages-list");
const messageInput = document.getElementById("message-input");
const messageBtn = document.getElementById("message-btn");
const allUsersList = document.querySelector(".users-types__all");
const activeUsersList = document.querySelector(".users-types__onlain");
const userSearch = document.getElementById("user-search");
const filterAuthor = document.getElementById("filter-author");
const filterText = document.getElementById("filter-text");
const filterDateFrom = document.getElementById("filter-from");
const filterDateTo = document.getElementById("filter-to");
const filterBtnSubmit = document.getElementById("filter__btn-submit");
const filterBtnCancel = document.getElementById("filter__btn-cancel");
const formBtn = document.getElementById("form-btn");
const usersBlock = document.getElementById("users-block");
const messagesBlock = document.getElementById("messages");
const main = document.getElementById("main");
const chatInput = document.getElementById("chat-input");
const headerLogo = document.getElementById("header-logo");
controller.setCurrentUser("Клусович Никита", messageInput, messageBtn, messageList);
let signInBtn = null;
const exitBtn = document.getElementById("exit-btn");
let regButton = null;

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
            controller.editMessage(id, {text: messageInput.value});
            id = null;
            messageInput.value = "";
            editFlag = false;
        } else {
            controller.addMessage({text: messageInput.value});
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
    changeFilterButtonsState(e);
});
filterAuthor.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterDateFrom.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterDateTo.addEventListener('input', (e) => {
    changeFilterButtonsState(e);
});
filterBtnSubmit.addEventListener("click", () => {
    messageList.innerHTML = "";
    controller.showMessages(0, 10, {
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value,
        dateFrom: filterDateFrom.value,
    });
});
filterBtnCancel.addEventListener("click", () => {
    filterDateTo.value = "";
    filterDateFrom.value = "";
    filterText.value = "";
    filterAuthor.value = "";
    controller.showMessages(0, 10, {
        author: filterAuthor.value, text: filterText.value,
        dateTo: filterDateTo.value,
        dateFrom: filterDateFrom.value,
    });
    changeFilterButtonsState();

});

function changeFilterButtonsState(e = false) {
    if (e && e.target.value.length) {
        filterBtnSubmit.disabled = false;
        filterBtnCancel.disabled = false;
        filterBtnSubmit.classList.remove("button-disabled");
        filterBtnCancel.classList.remove("button-disabled");
    } else {
        filterBtnSubmit.disabled = true;
        filterBtnCancel.disabled = true;
        filterBtnSubmit.classList.add("button-disabled");
        filterBtnCancel.classList.add("button-disabled");
    }

}

exitBtn.addEventListener("click", () => {
    controller.removeUser(undefined, messageInput, messageBtn, messageList);
    regButton = document.getElementById("check-in");
    signInBtn = document.getElementById("sign-in");
    regButton.addEventListener("click", () => {
        usersBlock.style.display = "none";
        messagesBlock.style.display = "none";
        chatInput.style.display = "none";
        document.forms[0].style.display = "flex";
        main.classList.add("main-form")
    });
    signInBtn.addEventListener("click", () => {
        usersBlock.style.display = "none";
        messagesBlock.style.display = "none";
        chatInput.style.display = "none";
        document.forms[0].style.display = "flex";
        main.classList.add("main-form")
    });

    headerLogo.addEventListener("click", () => {
        usersBlock.style.display = "flex";
        messagesBlock.style.display = "flex";
        chatInput.style.display = "flex";
        document.forms[0].style.display = "none";
        main.classList.remove("main-form")
    })
});





