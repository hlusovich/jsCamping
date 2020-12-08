class Notification {
    constructor() {
    }

    showNotification({text, succesfull}) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        const notificationIcon = document.createElement("div");
        const notificationText = document.createElement("div");
        notificationIcon.innerHTML = `<i class="material-icons">${succesfull ? "check_circle_outline" : "clear"}</i>`;
        if (succesfull) {
            notification.classList.add("notification-success");
        } else {
            notification.classList.add("notification-error");
        }
        notificationText.innerText = text;
        notification.appendChild(notificationIcon);
        notification.appendChild(notificationText);
        document.body.prepend(notification);
        setTimeout(() => {
            notification.remove();
        }, 5000)
    }

}