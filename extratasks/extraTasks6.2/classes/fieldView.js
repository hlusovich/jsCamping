class FieldView {
    constructor(containerId) {
        this.field = document.getElementById("field");
        this.field.innerHTML = "";
    }

    display() {
        for (let i = 1; i < 10; i++) {
            const ceil = document.createElement("div");
            ceil.classList.add("ceil");
            ceil.setAttribute("number", i);
            this.field.appendChild(ceil);
        }

    }

}