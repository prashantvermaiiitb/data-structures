/**
 * Node data structure for the Linked List
 */
class Node {
  /**
   * constructor
   * @param {*} data
   */
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  /**
   * Display the node
   */
  display() {
    console.log(this.data);
  }
  /**
   * getting the data
   */
  get() {
    return this.data;
  }
}
/**
 * LinkedList data structure
 */
class LinkedList {
  /**
   * constructor
   */
  constructor() {
    this.head = null;
    this.size = 0;
  }
  /**
   * Inserting element in the linkedList
   * @param {*} element
   */
  insert(element) {
    let newNode = new Node(element);
    if (this.head == null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode; //inserting the node at the last
    }
    this.size++; //incrementing the number of elements in the linkedlist.
  }
  /**
   * Inserting the element at the first Node
   * @param {*} element
   */
  insertFirst(element) {
    let newNode = new Node(element);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  insertAfter(element) {}
  insertAt(index, element) {}
  /**
   * Searching element in the linked list
   * @param {*} element
   */
  search(element) {
    let current = this.head;
    if (current === null) {
      return false;
    } else {
      while (current.data != element) {
        current = current.next;
        if (current === null) {
          return false;
        }
      }
      return true; // @todo current can be returned
    }
  }
  /**
   * Getting index of the element present in the linked list
   * @param {*} element
   */
  indexOf(element) {
    let current = this.head;
    let index = -1;
    if (current === null) {
      return -1;
    } else {
      while (current.data != element) {
        current = current.next;
        index++;
        if (current === null) {
          return -1;
        }
      }
      return index; // @todo current can be returned
    }
  }
  /**
   * Getting element at particular index
   * @param {*} index
   */
  elementAt(index) {
    let current = this.head;
    if (current === null || index > this.size || index < 0) {
      return false;
    } else {
      let count = 0;
      while (count < index) {
        count++;
        current = current.next;
      }
      return current;
    }
  }
  /**
   * removing the first element of the linked list
   */
  removeFirst() {
    if (this.isEmpty()) {
      return null;
    }
    let tmp = this.head;
    this.head = this.head.next;
    this.size--;
    return tmp;
  }
  /**
   * searching and removing the element from the linkedlist
   * @param {*} element
   */
  remove(element) {
    if (this.isEmpty()) return false;
    let current = this.head,
      parent;
    while (current.data !== element) {
      parent = current;
      current = current.next;
      if (current === null) {
        return false; //you have reached at the end and still not found
      }
    }
    parent.next = current.next; //you found the element
    this.size--;
    return true;
  }
  /**
   * Removing element at a particular index
   * @param {*} index
   */
  removeAt(index) {
    if (index < 0 || index > this.size || this.head === null) return false;
    let current = this.head,
      parent,
      count = 0;
    while (count < index) {
      count++;
      parent = current;
      current = current.next;
    }
    parent.next = current.next;
    this.size--;
    return true;
  }
  /**
   * checking list is empty or not
   */
  isEmpty() {
    return this.size == 0;
  }
  /**
   * Display the linked list
   */
  display() {
    let current = this.head;
    if (current === null) {
      console.log(`LinkedList is empty.`);
    } else {
      let result = "head";
      while (current !== null) {
        result += `--->${current.get()}`;
        current = current.next;
      }
      console.log(result);
    }
  }
  /**
   * Returning the length of the linked list;
   */
  length() {
    console.log(`Number of elements in the Linked list : ${this.size}`);
  }
  /**
   * demo functionality of Linked List
   */
  static demo() {
    const myLinkedList = new LinkedList();
    myLinkedList.insert(11);
    myLinkedList.insert(223);
    myLinkedList.insert(34);
    myLinkedList.insert(78);
    myLinkedList.insert(908);
    myLinkedList.display();
    myLinkedList.insert(8);
    myLinkedList.insert(982);
    myLinkedList.display();
    myLinkedList.length();
    myLinkedList.insertFirst(-1);
    myLinkedList.display();
    myLinkedList.length();
    console.log(
      `is 223 present in the linked list : ${myLinkedList.search(223)}`
    );
    console.log(
      `is 1223 present in the linked list : ${myLinkedList.search(1223)}`
    );
    console.log(
      `is 223 present in the linked list : ${myLinkedList.search(
        223
      )} @index(${myLinkedList.indexOf(223)})`
    );
    console.log(
      `is 1223 present in the linked list : ${myLinkedList.search(
        1223
      )} @index(${myLinkedList.indexOf(1223)})`
    );
    console.log(`element @index(${3})`, myLinkedList.elementAt(3));
    console.log(
      `removing the first element of linked List `,
      myLinkedList.removeFirst()
    );
    myLinkedList.display();
    console.log(
      `Is 34 removed from the linkedList : ${myLinkedList.remove(34)}`
    );
    console.log(
      `Is 134 removed from the linkedList : ${myLinkedList.remove(134)}`
    );
    myLinkedList.display();
    myLinkedList.length();
    console.log(`removing element at 2nd index`, myLinkedList.removeAt(2));
    myLinkedList.display();
    myLinkedList.length();
  }
}

LinkedList.demo();

module.exports = LinkedList;
