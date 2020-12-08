class ErrorPageVIew {
    constructor(){
    }
    display(){
        const errorPage = document.createElement("img");
        errorPage.classList.add("error-page");
        errorPage.src="./assets/images/errorPage.png";
        document.body.appendChild(errorPage);
        errorPage.addEventListener("click",()=>{
            window.location.reload();
        })
    }

}