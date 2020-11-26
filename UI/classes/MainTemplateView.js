class MainTemplateView {
    constructor(idSelector) {
        this.mainTemplate = document.getElementById(idSelector);
    }
    display() {
        document.body.innerHTML="";
        document.body.appendChild(this.mainTemplate.content.cloneNode(true));
    }
}