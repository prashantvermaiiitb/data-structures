/**
 * Demo representation for the Hash Table
 * insert / delete / search => O(1) in best case O(N) in worst-case
 * space complexity is O(N) in both worst and best cases
 * Hashing function is important and used for coming up with the bucketId for the storage.
 */

class HashTable {
  constructor(buckets = 4) {
    this.storage = [];
    this.bucketLimits = buckets; //number of buckets where we are gong to put the stuff
  }
  /**
   * takes the input and returns the hash
   * @param {*} string
   */
  hash(string, debug) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i);
    }
    debug && console.log(`hash generated from the input ${string} is ${hash}`);
    return hash % this.bucketLimits;
  }
  /**
   * Storing key / value pair in the hash table
   * @param {*} key
   * @param {*} value
   */
  add(key, value, debug) {
    if (!key) {
      throw new Error("Key should be valid string of non-zero length!!");
    }
    const bucketId = this.hash(key, debug);
    debug &&
      console.log(
        `BucketId ${bucketId} generated for the ${key} with value ${value}`
      );
    if (
      this.storage[bucketId] !== undefined &&
      this.storage[bucketId].length > 0
    ) {
      let i = 0;
      for (; i < this.storage[bucketId].length; i++) {
        let tmpBucket = this.storage[bucketId][i]; //get the array in the bucket
        if (tmpBucket[0] === key) {
          tmpBucket[1] = value; //updating the old value with new one
          break;
        }
      }
      //entry not has been added
      //@todo alternatively boolean flag could be used for this.
      if (i === this.storage[bucketId].length) {
        this.storage[bucketId].push([key, value]);
      }
    } else {
      this.storage[bucketId] = []; //creating the bucket first
      this.storage[bucketId].push([key, value]); //inserting element in the bucket then
    }
  }

  /**
   * Printing the hashtable in the console
   */
  print() {
    console.log(this.storage);
  }
  /**
   * Removing a particular key from the storage
   * @param {*} key
   */
  remove(key, type = 1) {
    if (this.isValidKey(key)) {
      const bucketId = this.hash(key);
      if (
        Array.isArray(this.storage[bucketId]) &&
        this.storage[bucketId].length > 0
      ) {
        if (type == 1) {
          //this will delete and left the entry to be undefined
          //single entry in the array
          if (
            this.storage[bucketId].length === 1 &&
            this.storage[bucketId][0] === key
          ) {
            delete this.storage[bucketId];
          } else {
            let i = 0;
            for (; i < this.storage[bucketId].length; i++) {
              if (
                this.storage[bucketId][i] &&
                this.storage[bucketId][i][0] === key
              ) {
                delete this.storage[bucketId][i];
                return true;
              }
            }
            if (i === this.storage[bucketId].length) {
              return false;
            }
          }
        }
        //   // this will store an empty array instead in the buckets
        // else {
        //   this.storage[bucketId] = this.storage[bucketId].filter(
        //     (value) => value[0] !== key
        //   );
        // }
      }
      return false;
    }
    throw new Error("Please pass on a valid key");
  }
  /**
   * Searching a particular key in the hashtable
   * @param {*} key
   */
  lookup(key) {
    if (this.isValidKey(key)) {
      const bucketId = this.hash(key);
      if (
        Array.isArray(this.storage[bucketId]) &&
        this.storage[bucketId].length > 0
      ) {
        let entries = this.storage[bucketId].filter(
          (value) => value[0] === key
        );
        return entries.length
          ? `[${entries}] are found for ${key} in Bucket(${bucketId})`
          : "NOT PRESENT";

        // for (let i = 0; i < this.storage[bucketId].length; i++) {
        //   if (this.storage[bucketId][i][0] === key) {
        //     return this.storage[bucketId][i][1];
        //   }
        // }
      }
      return null;
    }
    throw new Error("Please pass on a valid key");
  }
  /**
   * Simple utility for checking the relevance of the key
   * @param {*} key
   */
  isValidKey(key) {
    return key && key !== "";
  }

  /**
   * Static function for the Demo functionality
   */
  static demo() {
    const hashTable = new HashTable();

    hashTable.add("John", "father");
    hashTable.add("Jill", "mother");
    hashTable.add("humpty", "son");
    hashTable.add("donna", "daughter");
    hashTable.add("patrick", "grand-father");
    hashTable.add("selina", "grand-mother");
    hashTable.add("tulip", "aunt");
    hashTable.add("Tikola", "aunt");
    hashTable.add("kim", "aunt");
    hashTable.add("cloe", "granny");
    hashTable.print();

    console.log(
      `Looking for the key 'prashant',`,
      hashTable.lookup("prashant")
    );
    console.log(hashTable.lookup("cloe"));
    console.log(hashTable.lookup("kim"));

    console.log(`Removing 'kim' from the hashtable..`, hashTable.remove("kim"));
    hashTable.print();
    console.log(`Removing 'kim' from the hashtable..`, hashTable.remove("kim"));
    hashTable.print();
  }
}

HashTable.demo();

module.exports = HashTable;
