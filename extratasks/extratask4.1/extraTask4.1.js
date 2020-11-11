"use strict";

class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
    }

}

class List {
    constructor(root) {
        this.root = new Node(root);
        this.length = 1;
    }

    /**
     * addNode using params value and index.
     * @param {number} value this is value of new Node.
     * @param {number} index - facultative argument. If it is not passed the new node is automatically added to the end of the list.
     if it is passed , it show the position to add a new node to list.
     * @returns {boolean} If index < list length and index >= 0 return value true ,in other cases return false.
     */
    addNode(value, index) {
        if (index < 0 || index >= this.length) {
            return false;
        }
        let currentNode = this.root;
        for (let i = 0; i < this.length - 1; i++) {
            if (index === i) {
                break
            }
            currentNode = currentNode.next;
        }
        let newNode = new Node(value);
        if (index !== undefined) {
            newNode.next = currentNode.next;
        }
        currentNode.next = newNode;
        this.length++;
        return true;
    }

    /**
     * removeNode using params index.
     * @param {number} index - facultative argument. If it is not passed the  node is automatically removed from  the end of the list.
     if it is passed , it show the position to remove the node from list.
     * @returns {boolean} If list length>1, index < list length and index >= 0 return value true  ,in other cases return false.
     */
    removeNode(index) {
        if (index < 0 || this.length <= index || this.length === 1) {
            return false;
        }
        let currentNode = this.root;
        if (index === 0) {
            this.root = currentNode.next;
            this.length--;
            return true;
        }
        let prevNode = null;
        for (let i = 0; i < this.length - 1; i++) {
            if (index === i) {
                break
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        prevNode.next = currentNode.next;
        this.length--;
        return true;
    }

    /**
     * print is no use any params.
     * Print the values of all elements in a row to the console, separated by commas, starting with root.
     * @returns {undefined}.
     */
    print() {
        let currentNode = this.root;
        const listValues = [];
        for (let i = 0; i < this.length; i++) {
            listValues.push(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log(...listValues);
    }

}

console.log("создаем list с корневым значением dog");
const list = new List("dog");
console.log("выведем list");
list.print();
console.log("попробуем удалить единственное значение из списка");
console.log(list.removeNode());
console.log("выведем list");
list.print();
console.log("попробуем удалить единственное значение из списка");
console.log(list.removeNode(0));
console.log("выведем list");
list.print();
console.log("добавим значение cat в конец");
console.log(list.addNode("cat"));
console.log("добавим значение monkey в конец");
console.log(list.addNode("monkey"));
console.log("выведем list");
list.print();
console.log("добавим птицу между котом и обезьяной");
console.log(list.addNode("bird", 1));
list.print();
console.log("добавим машину между котом и птицей");
console.log(list.addNode("car", 1));
list.print();
console.log("добавим конфликт между птицей и обезьяной");
console.log(list.addNode("conflict", 3));
list.print();
console.log("добавим блинчики в 666 позицию ");
console.log(list.addNode("pancakes", 666));
list.print();
console.log("помирими птицу и обезьяну  ");
console.log(list.removeNode(4));
list.print();
console.log("прогоним машину");
console.log(list.removeNode(2));
list.print();
console.log("удалим последний эллемент, не передавая параметров");
console.log(list.removeNode());
list.print();
console.log("попробуем удалить эллемент,с индексом больше length");
console.log(list.removeNode(1024));
list.print();
console.log("попробуем удалить эллемент,с индексом 0");
console.log(list.removeNode(0));
list.print();
console.log("добавим короля в нулевое положение");
console.log(list.addNode("king", 0));
list.print();
console.log("добавим пирог в конец");
console.log(list.addNode("chocoCake"));
list.print();


