class Model {
    constructor() {
        this.gameSymbal = "X";
        this.count = 0;
        this.endOfGame = [
            [1, 2, 3],
            [1, 4, 7],
            [1, 5, 9],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [4, 5, 6],
            [7, 8, 9]
        ];
        this.playerData = [];
        this.computerData = [];
        this.ceils = [1,2,3,4,5,6,7,8,9];
        this.victory = false;
    }

    removeFromFreeCeils(target) {
        this.ceils = this.ceils.filter(item => item !== target);
        return false;
    }
    fillCeil(ceil) {
        const num = +ceil;
        if (num) {
            if (this.gameSymbal === "X") {
                this.playerData.push(num);
                this.removeFromFreeCeils(num);
                return {num,gameSymbal:this.gameSymbal}
            } else {
                this.computerData.push(num);
                this.removeFromFreeCeils(num);
                return {num,gameSymbal:this.gameSymbal}
            }
        }
    }

    fillCeilByComputer() {
        if (this.gameSymbal === "O") {
            const randomChoiceCeil = this.ceils[Math.floor(Math.random() * this.ceils.length)];
            this.ceils = this.ceils.filter(item => item !== randomChoiceCeil);
            if (this.ceils.length && !this.victory) {
                return randomChoiceCeil;
            }
        }
    }

    changeSymbol() {
        this.gameSymbal === "X" ? this.gameSymbal = "O" : this.gameSymbal = "X";
    }

    isVictory(arr, number) {
        if (arr.length > 2) {
            for (let i = 0; i < this.endOfGame.length; i++) {
                let equal = 0;
                if (this.endOfGame[i].includes(number)) {
                    for (let j = 0; j < this.endOfGame[i].length; j++) {
                        if (arr.includes(this.endOfGame[i][j])) {
                            equal++;
                            if (equal === 3) {
                                return true;
                            }
                        }
                    }
                    equal = 0;
                }
            }
        }
    }
}