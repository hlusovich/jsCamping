class Controller {
    constructor() {
        this.model = new Model();
        this.messageView = new FinalScreenView("modal");
        this.switchButton = new SwitchButtonView(".header__switch-button");
        this.fieldView = new FieldView("field");
        this.fieldView.display();
        this.ceilsView = new CeilsView(".ceil");
        this.menuMtn = document.querySelector(".header__menu");
        this.shortLines = new ShortLinesView(".header__menu-line-short");
        this.longLines = new LongLinesView(".header__menu-line-long");
        this.aside = new AsideView("aside");
        this.swicthBlock = document.querySelector(".header__switch");
        this.switchText = document.querySelector(".header__switch-button-text");
        this.asideItem = document.querySelector(".aside_item");
        this.event = new Event("click", {bubbles: true});
        this.event._isTrusted = true;
    }

    addFieldListener() {
        this.fieldView.field.addEventListener("click", (e) => {
            if (e.target.localName === "div") {
                this.model.removeFromFreeCeils(e.target.getAttribute("number"));
                const num = this.model.fillCeil(e.target.getAttribute("number"));
                if (num) {
                    this.ceilsView.display(num);
                    this.endOfGame(num.num);
                    this.model.changeSymbol();
                    const randomCeil = this.model.fillCeilByComputer();
                    if (randomCeil) {
                        Array.from(this.ceilsView.ceils).find(item => +item.getAttribute("number") === randomCeil).dispatchEvent(this.event);
                    }
                }
            }
        });
    };

    startGame() {
        this.addFieldListener();
        this.switchButton.switchButton.addEventListener("click", () => {
            this.switchButton.display(this.swicthBlock, this.aside.aside, this.fieldView, this.switchText);
        });
        this.menuMtn.addEventListener("click", () => {
            this.showMenu();
        });
        this.asideItem.addEventListener("click", () => {
            this.showMenu();
        });
        this.messageView.modal.addEventListener("click", () => {
            this.messageView.modal.classList.remove("modal_active");
            Array.from(this.fieldView.field.children, (i) => {
                i.innerHTML = ""
            });
            this.model.gameSymbal = "X";
            this.model.count = 0;
            this.model.playerData = [];
            this.model.computerData = [];
            this.model.ceils = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.model.victory = false;
        });
    }

    showMenu() {
        this.shortLines.display();
        this.aside.display();
        this.longLines.display();
    };

    endOfGame(num) {
        if (this.model.isVictory(this.model.computerData, num) || this.model.isVictory(this.model.playerData, num)) {
            this.model.victory = true;
            return this.messageView.display(this.model.gameSymbal, this.model.count)
        }
        this.model.count++;
        if (this.model.count === 9) {
            this.model.victory = true;
            this.messageView.display(this.model.gameSymbal, this.model.count);
        }
    }
}



