const Node = require('./Node');

class List {
  constructor(root) {
    this.root = new Node(root);
    this.length = 1;
  }

  /**
     * addNode using params value and index.
     * @param {number} value this is value of new Node.
     * @param {number} index - facultative argument.
     * If it is not passed the new node is automatically added to the end of the list.
     * if it is passed , it show the position to add a new node to list.
     * @returns {boolean} If index < list length and index >= 0 return
     * value true ,in other cases return false.
     */
  addNode(value, index) {
    if (index < 0 || index >= this.length) {
      return false;
    }
    let currentNode = this.root;
    for (let i = 0; i < this.length - 1; i += 1) {
      if (index === i) {
        break;
      }
      currentNode = currentNode.next;
    }
    const newNode = new Node(value);
    if (index !== undefined) {
      newNode.next = currentNode.next;
    }
    currentNode.next = newNode;
    this.length += 1;
    return true;
  }

  /**
     * removeNode using params index.
     * @param {number} index - facultative argument. If it is not
     * passed the  node is automatically removed from  the end of the list.
     * if it is passed , it show the position to remove the node from list.
     * @returns {boolean} If list length>1, index < list length and index
     * >= 0 return value true  ,in other cases return false.
     */
  removeNode(index) {
    if (index < 0 || this.length <= index || this.length === 1) {
      return false;
    }
    let currentNode = this.root;
    if (index === 0) {
      this.root = currentNode.next;
      this.length -= 1;
      return true;
    }
    let prevNode = null;
    for (let i = 0; i < this.length - 1; i += 1) {
      if (index === i) {
        break;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    prevNode.next = currentNode.next;
    this.length -= 1;
    return true;
  }

  /**
     * print is no use any params.
     * Print the values of all elements in a row to the
     * console, separated by commas, starting with root.
     * @returns {undefined}.
     */
  print() {
    let currentNode = this.root;
    const listValues = [];
    for (let i = 0; i < this.length; i += 1) {
      listValues.push(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(...listValues);
  }
}

console.log('создаем list с корневым значением 1');
const list = new List(1);
console.log('выведем list');
list.print();
console.log('попробуем удалить единственное значение из списка');
console.log(list.removeNode());
console.log('выведем list');
list.print();
console.log('попробуем удалить единственное значение из списка используя индекс');
console.log(list.removeNode(0));
console.log('выведем list');
list.print();
console.log('добавим значение 22 в конец');
console.log(list.addNode(22));
console.log('добавим значение 33 в конец');
console.log(list.addNode(33, 1));
console.log('выведем list');
list.print();
console.log('добавим 44 между 22 и 33');
console.log(list.addNode(44, 1));
list.print();
console.log('добавим 55 между 22 и 44');
console.log(list.addNode(55, 1));
list.print();
console.log('добавим 78 между 44 и 33');
console.log(list.addNode(78, 3));
list.print();
console.log('добавим 666 в 666 позицию ');
console.log(list.addNode(666, 666));
list.print();
console.log('уберем 78 ');
console.log(list.removeNode(4));
list.print();
console.log('уберем 55');
console.log(list.removeNode(2));
list.print();
console.log('удалим последний эллемент, не передавая параметров');
console.log(list.removeNode());
list.print();
console.log('попробуем удалить эллемент,с индексом больше length');
console.log(list.removeNode(1024));
list.print();
console.log('попробуем удалить эллемент,с индексом 0');
console.log(list.removeNode(0));
list.print();
console.log('добавим 777  по индексу 0');
console.log(list.addNode(777, 0));
list.print();
