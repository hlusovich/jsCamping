class ShortLinesView{
    constructor(classSelector){
        this.shortLines = document.querySelectorAll(classSelector);
    }
    display(){
        Array.from(this.shortLines).map((item, ind) => {
            item.classList.toggle("white");
            if (ind === 1) {
                item.classList.toggle("header__menu-line-short_right");
            } else {
                item.classList.toggle("header__menu-line-short_left");
            }
        });
    }

}