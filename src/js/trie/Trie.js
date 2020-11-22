/**
 * Trie is a data-structure that's being used to store associative data. Example
 * for this could be Dictionary of words.
 * {
  b: {a: {l: {l: {isEnd: true,
        },
      },
      t: {
        isEnd: true,
      },
    },
    e: {isEnd: true,
    },
  },
  c: {a: {t: { isEnd: true },
    },
  },
  d: {o: {isEnd: true, r: {k: {isEnd: true,
        },
      },
      l: {
        l: {
          isEnd: true,
        },
      },
    },
  },
};
 */

/**
 * Basic node structure for Trie
 */
class Node {
  /**
   * constructor
   */
  constructor() {
    //map :-
    //has key (indicates value or point to another object)
    //value could be a Node again because it has (keys : <Nodes>)
    this.map = new Map();
    this.end = false; // whether the node is the end of the word.
  }
  /**
   * Marking the Node as the terminating character
   */
  setEnd() {
    this.end = true;
  }
  unSetEnd() {
    delete this.end;
  }
  /**
   * Checking whether Node's key is the end character for the word
   */
  isEnd() {
    return this.end;
  }
}

/**
 * Trie data structure main class
 */
class Trie {
  /**
   * Constructor function
   */
  constructor() {
    //will help
    this.root = new Node();
  }
  /**
   * Adding a word in the Trie.
   * This will be a recursive method
   * will be used with the input and the starting node
   * loop will be called after the last node as well.
   * @param {*} input
   * @param {*} node
   */
  insert(input, node = this.root) {
    if (input.length === 0) {
      // when the request is for the leaf node 'character'
      node.setEnd();
      return;
    } else if (!node.map.has(input[0])) {
      //if the starting character is not present we have to insert that
      node.map.set(input[0], new Node());
      this.insert(input.substr(1), node.map.get(input[0])); //just created node reference will be passed for further operations
    } else {
      //if the starting character is present we have to continue moving down the lane
      // e.g 'ball' is already Present while we are inserting 'bat'
      this.insert(input.substr(1), node.map.get(input[0]));
    }
  }
  /**
   * Removing the word from the Trie
   * @param {*} input
   * @param {*} node
   */
  remove(input, node = this.root) {
    if (input !== "" && !node.map.has(input[0])) {
      //not able to find the character in the word given
      //base case will be triggered because of null string check here
      return false;
    } else if (input.length === 0) {
      //   console.log("length is 0");
      //   console.log(node);
      //   console.log(
      //     "result of the condition .. ",
      //     node.map.size === 0 && node.isEnd()
      //   );
      // base case for the input string
      if (node.map.size === 0 && node.isEnd()) {
        //have reached the proper word's last character and that's marked as last too
        return true;
      } else if (node.isEnd()) {
        //when this last character has further connections
        delete node.unSetEnd();
        return false;
      }
      return false; //cannot delete this character
    } else {
      //   console.log("inside remove..", input);
      let output = this.remove(input.substr(1), node.map.get(input[0]));
      //   console.log(output, " for ", input, node);
      if (output) {
        // console.log(node.map.get(input[0]));
        if (node.map.get(input[0]).map.size === 0) {
          node.map.delete(input[0]);
          return true;
        }
      }
      return false; // else no deletion needed from this point
    }
  }
  /**
   * searching for the words presence in the Trie
   */
  search(word) {
    let node = this.root;
    while (word.length > 1) {
      //leaving the last character
      if (!node.map.has(word[0])) {
        return false;
      } else {
        node = node.map.get(word[0]); //move to the next character
        word = word.substr(1); //new substring formation
      }
    }
    return node.map.has(word) && node.map.get(word).isEnd();
  }
  /**
   * Printing the Entire Trie
   */
  print() {
    let words = [];
    let node = this.root;
    let search = function (node, string) {
      //is there something in the Trie ?
      // or you are the leaf node
      if (node.map.size !== 0) {
        //will execute till b -> a -> l
        for (let key of node.map.keys()) {
          search(node.map.get(key), string.concat(key));
        }
        // for the intermediate words like for 'o' in doll we have
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        // Trie is empty
        //the last l in ball will be here i.e. at the leaf node we are
        // console.log(node.isEnd()); You are at the end of the TRIE
        string.length > 1 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String()); //all the words intermediate will be entered as strings
    return words.length > 0 ? words : null;
  }
  /**
   * Demo the functionality of the Trie
   */
  static demo() {
    const myTrie = new Trie();
    myTrie.insert("ball");
    myTrie.insert("bat");
    myTrie.insert("base");
    myTrie.insert("bucket");
    myTrie.insert("because");
    myTrie.insert("cat");
    myTrie.insert("catastrophic");
    myTrie.insert("catalyst");
    myTrie.insert("doll");
    myTrie.insert("deck");
    myTrie.insert("dock");
    myTrie.insert("do");
    myTrie.insert("engine");
    myTrie.insert("egg");
    console.log(myTrie.print());
    console.log(`Is 'egg' being present in the Trie..`, myTrie.search("egg"));
    console.log(`Is 'egg' removed from the Trie..`, myTrie.remove("egg"));
    console.log(myTrie.print());
    console.log(`Is 'egg' present in the Trie..`, myTrie.search("egg"));
    console.log(`Edge-case removing blank string.. `, myTrie.remove(""));
    console.log(`removing dolla string.. `, myTrie.remove("dolla"));
    console.log(`removing doll string.. `, myTrie.remove("doll"));
    console.log(myTrie.print());
  }
}

Trie.demo();
