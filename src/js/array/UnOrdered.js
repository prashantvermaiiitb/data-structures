var LinearSearch = require("../utils/LinearSearch");
var BubbleSort = require("../utils/BubbleSort");
var SelectionSort = require("../utils/SelectionSort");
var InsertionSort = require("../utils/InsertionSort");
var BinarySearch = require("../utils/BinarySearch");
var { RecursiveBinarySearch } = require("../utils/RecusiveBinarySearch");
/**
 * Sample class Array for showing the operations that can be performed on the Array
 * TO run this code use command : node src/js/array/UnOrdered.js
 */
class MyArray {
  /**
   * Constructor function
   * @param {*} size - size of the array, default to 10
   */
  constructor(size = 10) {
    this.size = 0;
    this.array = new Array(size).fill(0);
  }
  /**
   * Inserting element in the Array
   * @param {*} element
   */
  insert(index, element) {
    this.array[index] = element;
    this.size++;
  }
  /**
   * Searching element in the Array
   * @param {*} element
   */
  find(element, type) {
    switch (type) {
      case 1:
        return BinarySearch(this.array, element); //will be used once array is sorted
      case 2:
        return RecursiveBinarySearch(this.array, element, 0, this.array.length);
      default:
        return LinearSearch(this.array, element);
    }
  }
  /**
   * Checking whether element is present or not in the Array.
   * @param {*} element
   */
  isElementPresent(element, type) {
    let index = this.find(element, type);
    return !(index == -1);
  }
  /**
   * Deleting element from the Array
   * @param {*} element
   */
  delete(element) {
    let index = this.find(element);
    if (index == this.size) {
      console.log(
        `Element ${element} is not being present in the Array to be deleted.`
      );
    } else {
      for (let i = index; i < this.size; i++) {
        this.array[i] = this.array[i + 1];
      }
      this.size--;
    }
  }
  /**
   * Sorting Array by different methods
   */
  sortArray(type) {
    switch (type) {
      case 1:
        console.log("------------PERFORMING SELECTION SORT---------------");
        SelectionSort(this.array);
        break;
      case 2:
        console.log("------------PERFORMING INSERTION SORT---------------");
        InsertionSort(this.array);
        break;
      default:
        console.log("------------PERFORMING BUBBLE SORT---------------");
        BubbleSort(this.array);
        break;
    }
  }
  /**
   * Displaying the Array
   */
  displayArray() {
    console.log("---------------------------");
    console.log(`[${this.array}] has size ${this.size}`);
    console.log("---------------------------");
    console.log();
  }
  /**
   * This will be function that will be present in all the data-structures.
   * This will trigger all the operations that are being supported by it.
   */
  static demo() {
    let myArray = new MyArray(9),
      i;
    for (i = 0; i < 9; i++) {
      myArray.insert(i, Math.floor(Math.random() * 1000));
    }
    myArray.insert(i, 380);
    myArray.displayArray();
    myArray.sortArray();
    myArray.displayArray();
    console.log(`Is 380 present in Array ..`, myArray.isElementPresent(380));
    console.log(`Is 380 present in Array @index..`, myArray.find(380));
    myArray.delete(570);
    myArray.delete(380);
    myArray.displayArray();
    myArray.insert(myArray.size, 678);
    myArray.displayArray();
    myArray.sortArray(1);
    myArray.displayArray();
    myArray.insert(myArray.size, 8);
    myArray.insert(myArray.size, 2);
    myArray.displayArray();
    myArray.sortArray(2);
    myArray.displayArray();
    console.log(
      `Searching 678 using Binary Search in Array @index..`,
      myArray.find(678, 1)
    );
    console.log(
      `Searching 678 using recursive-Binary Search in Array @index..`,
      myArray.find(678, 2)
    );
    console.log(
      `Is 1678 present in Array ..`,
      myArray.isElementPresent(380, 2)
    );
  }
}

MyArray.demo();
