class FinalScreenView {
    constructor(idContainer) {
        this.modal = document.getElementById(idContainer);
    }

    display(gameSymbal, count) {
        if (count === 9) {
            this.modal.firstElementChild.classList.remove("modal__inner-win", "modal__inner-lose");
            this.modal.firstElementChild.classList.add("modal__inner-nothing");
            this.modal.classList.add("modal_active");
            this.modal.firstElementChild.firstElementChild.innerText = "Ничья";
            return
        }
        if (gameSymbal === "X") {
            this.modal.firstElementChild.classList.remove("modal__inner-nothing", "modal__inner-lose");
            this.modal.firstElementChild.classList.add("modal__inner-win");
            this.modal.classList.add("modal_active");
            this.modal.firstElementChild.firstElementChild.innerText = "Поздравляем, Вы победили";
        } else if (gameSymbal === "O") {
            this.modal.firstElementChild.classList.remove("modal__inner-win", "modal__inner-nothing");
            this.modal.firstElementChild.classList.add("modal__inner-lose");
            this.modal.classList.add("modal_active");
            this.modal.firstElementChild.firstElementChild.innerText = "Вы проиграли";
        }

    }
}