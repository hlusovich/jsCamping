class LongLinesView {
    constructor(classSelector) {
        this.longLines = document.querySelectorAll(classSelector);
    }

    display() {
        Array.from(this.longLines).map((item, ind) => {
            item.classList.toggle("white");
            if (ind === 1) {
                item.classList.toggle("header__menu-line-long_left");
            }
        });
    }
}
