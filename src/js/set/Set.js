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
  union(otherSet) {}
  intersection(otherSet) {}
  difference(otherSet) {}
  subset(otherSet) {}
  /**
   * Display the content of the set
   */
  display() {
    console.log(...this.collection);
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
    console.log("adding a again in the set :", mySet.add("a"));
  }
}

MySet.demo();
