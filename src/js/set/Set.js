/**
 * class for demonstrating the usage of the set
 * Building custom set.
 * set is similar to array except that it has unique elements
 */
class MySet {
  /**
   * constructor
   */
  constructor() {
    this.collection = [];
  }
  /**
   * checking for the existence of the element
   * @param {*} element
   */
  has(element) {
    return this.collection.indexOf(element) !== -1; //@todo shoud have tried for includes() method as well
  }
  /**
   * adding the element in the set
   * @param {*} element
   */
  add(element) {
    if (!this.has(element)) {
      this.collection.push(element);
      return true;
    }
    return false;
  }
  /**
   * returning the values of the set
   */
  values() {
    return this.collection;
  }
  /**
   * removing the elements of the set
   * @param {*} element
   */
  remove(element) {
    if (this.has(element)) {
      let index = this.collection.indexOf(element);
      this.collection.splice(index, 1);
      return true;
    }
    return false;
  }
  /**
   * returning the number of the elements in the set.
   */
  size() {
    return this.collection.length;
  }
  union(otherSet) {
    // console.log("inside parent of the arrow", this);
    let that = this;

    otherSet.collection.forEach((value) => {
      //inside the browser this will be pointing to the A() while here it's not
      //for that we have to use 'that' in the variable
      // console.log("inside arrow..", this);

      !that.has(value) && that.add(value);
    });
  }
  /**
   * Getting the common elements out of both the sets
   * @param {*} otherSet
   */
  intersection(otherSet) {
    let that = this,
      tmpSet = new MySet();
    otherSet.collection.forEach((value) => {
      if (that.has(value)) {
        tmpSet.add(value);
      }
    });
    return tmpSet;
  }
  /**
   * Getting the difference out of the 2 sets
   * Who is calling this method will be the starting point.
   * @param {*} otherSet
   */
  difference(otherSet) {
    let that = this,
      tempSet = new MySet();
    this.collection.forEach((value) => {
      !otherSet.has(value) && tempSet.add(value);
    });
    return tempSet;
  }
  /**
   * Checking whether the passed set is the subset of the called set.
   * @param {*} otherSet
   */
  subsetOf(otherSet) {
    let that = this;
    return that.collection.every((value) => {
      return otherSet.has(value);
    });
  }
  /**
   * Display the content of the set
   */
  display() {
    console.log("------------------------------------------------------");
    console.log(`Displaying ${this.constructor.name}`, ...this.collection);
    console.log("------------------------------------------------------");
  }
  /**
   * static method for the Demo of the functionality
   */
  static demo() {
    let mySet = new MySet();
    mySet.add("a");
    mySet.add("b");
    mySet.add("c");
    mySet.add("d");
    mySet.display();
    console.log("Will a again be added in mySet :", mySet.add("a"));

    let otherSet = new MySet();
    otherSet.add("a");
    otherSet.add("b");
    otherSet.add("e");
    otherSet.add("f");
    otherSet.display();

    mySet.union(otherSet);
    console.log("After Union with otherSet :");
    mySet.display();

    mySet.intersection(otherSet).display(); // displaying the tempSet
    mySet.difference(otherSet).display(); // displaying the tempSet
    console.log("Is mySet is subset of otherSet...", mySet.subsetOf(otherSet)); // displaying the tempSet
    console.log("Is otherSet is subset of mySet...", otherSet.subsetOf(mySet)); // displaying the tempSet

    console.log('\n\n');
    console.log(`Working with ES6-set`);

    let es6Set = new Set();
    es6Set.add(1);
    es6Set.add(2);
    es6Set.add(3);
    es6Set.add(4);
    es6Set.add(5);
    console.log(es6Set);
    console.log(es6Set.add(1));
    console.log(es6Set.add(10));
    console.log(es6Set.delete(3));
    console.log(es6Set);
  }
}

MySet.demo();

module.exports = MySet;
