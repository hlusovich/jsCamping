class SwitchButtonView {
    constructor(selector) {
        this.switchButton = document.querySelector(selector);
    }
    display(swicthBlock, aside, fieldView, switchText) {
        this.switchButton.classList.toggle("header__switch-button-active");
        swicthBlock.classList.toggle("yellow");
        aside.classList.toggle("yellow");
        Array.from(fieldView.field.childNodes, (i) => {
            i.classList.toggle("ceil_yellow-borders");
        });
        fieldView.field.classList.toggle("field_yellow-borders");
        if (switchText.innerText === "Green") {
            switchText.innerText = "Yellow";
        } else {
            switchText.innerText = "Green";
        }

    }
}