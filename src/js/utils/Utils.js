/**
 * Forming the array
 * @param {*} array
 * @param {*} size
 */
function formArray(array, size = 10) {
  //when we are passing only the reference
  if (!Array.isArray(array) || size == 10) {
    array = new Array(size);
  }
  for (let i = 0; i < size; i++) {
    array[i] = parseInt((Math.random() * 1000).toFixed(0)); //toFixed returns the string
  }
  return array;
}

/**
 * Swapping the element in the arrayß
 * @param {*} indexA
 * @param {*} indexB
 * @param {*} array
 */
function swap(indexA, indexB, array) {
  let tmp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = tmp;
}

/**
 * Changing the Base for the Number
 * @param {*} decimal
 * @param {*} radix
 */
function changeToOtherBase(number, radix) {
  let result = [];
  while (number >= 1) {
    result.push(number % radix);
    number = Math.floor(number / radix);
  }
  return result.reverse().join("");
}

/**
 * Change the base of the number recursively
 * @param {*} number
 * @param {*} radix
 */
function changeToOtherBaseRecursive(number, radix) {
  if (number <= radix - 1) {
    return number;
  } else {
    let prefix = changeToOtherBaseRecursive(Math.floor(number / radix), radix);
    let suffix = number % radix;
    return `${prefix}${suffix}`;
  }
}

module.exports = {
  getArray: formArray,
  swap,
  changeToOtherBase,
};

console.log(`updating the base for 23 is : `, changeToOtherBase(15, 2));
console.log(
  `updating the base for 23 is : `,
  changeToOtherBaseRecursive(15, 2)
);
console.log(`updating the base for 23 is : `, changeToOtherBase(15, 16));
console.log(
  `updating the base for 23 is : `,
  changeToOtherBaseRecursive(15, 16)
);
console.log(`updating the base for 23 is : `, changeToOtherBase(15, 8));
console.log(
  `updating the base for 23 is : `,
  changeToOtherBaseRecursive(15, 8)
);
