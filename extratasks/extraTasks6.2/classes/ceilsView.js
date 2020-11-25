class CeilsView {
    constructor(classSelector) {
        this.ceils = document.querySelectorAll(classSelector);
    }

    display({num, gameSymbal}) {
        const ceil = Array.from(this.ceils).find(item => +item.getAttribute("number") === num);
        ceil.innerHTML = gameSymbal === "X" ? ceil.innerHTML = `<div class="tac">${gameSymbal}</div>`
            : ceil.innerHTML = `<div class="toe">${gameSymbal}</div>`;
    }
}