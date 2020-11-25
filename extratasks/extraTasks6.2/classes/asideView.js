class AsideView{
    constructor(idSelector){
        this.aside = document.getElementById(idSelector);
    }
    display(){
        this.aside.classList.toggle("aside_left");
    }
}