//Telling Node to Use FS System
//Using this because Node is in transition to fully support import/export
const fs = require("fs");

//helps break up raw input into individual lines
const readline = require("readline");

//creates instance of package to accept the file name THEN uses FS to read the file and pass that to new instance of readline package that was created
const readliner = readline.createInterface({
  input: fs.createReadStream("sowpods.txt"),
});

//tests function runs and returns results sought
// console.log(readliner);

//accesses await via async fn THEN for loop that waits for readliner to be ready before each iteration of the loop (line 15) AND when the word is ready then stores the word into variable word THEN console.log to output in terminal THEN line 19 tells the fn to run
const readlines = async () => {
  // storing not necessary here
  // let type_substr = [];

  // initialize at 0
  let typeCounter = 0;
  // assigned empty array
  let ghtly_words = [];

  // defines w/o assignment; assignment local at top of for loop; tells js to use the first word for comparison the first time loops before comparing word to word thereafter
  let shortest_word;

  // similar setup for shortest word
  let longest_word;

  // globally scoped to maintain access to the word after completion of the letter loop in the word loop
  let q_count = 0;
  let x_count = 0;
  let z_count = 0;

  let longest_palindrome;

  let allWords = [];

  // primary function used to solve all of the problems
  for await (const word of readliner) {
    allWords.push(word);
    if (word.includes("TYPE")) {
      typeCounter = typeCounter + 1;
      //   type_substr.push(word); this with let type_substr = [] from above creates array that stores the words but this is inefficient/unnecessary per what the question asks
    }

    const last5Letters = word.substring(word.length - 5);
    if (last5Letters === "GHTLY") {
      ghtly_words.push(word);
    }
    // if (/.*ghtly/i.test(word)) {
    //   ghtly_words.push(word);
    // }

    if (
      word.includes("A") &&
      word.includes("E") &&
      word.includes("I") &&
      word.includes("O") &&
      word.includes("U")
    ) {
      if (!shortest_word) {
        shortest_word = word;
      }

      if (word.length < shortest_word.length) {
        shortest_word = word;
      }
    }

    if (!longest_word) {
      longest_word = word;
    }
    if (
      !word.includes("A") &&
      !word.includes("E") &&
      !word.includes("I") &&
      !word.includes("O") &&
      !word.includes("U") &&
      !word.includes("Y")
    ) {
      if (word.length > longest_word.length) {
        longest_word = word;
      }
    }

    for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
      const letter = word.charAt(letterIndex);

      if (letter === "Q") {
        q_count++;
      } else if (letter === "X") {
        x_count++;
      } else if (letter === "Z") {
        z_count++;
      }
    } //end of each letter loop

    // immutable variable assigned value of word that is respectively taken apart by each charcter aka letter THEN those characters arranged in the opposite order THEN those characters put back together to allow the word(s) to be read front to back AND back to front
    const reversedWord = word.split("").reverse().join("");
    if (word === reversedWord) {
      if (!longest_palindrome) {
        longest_palindrome = word;
      }
      if (word.length > longest_palindrome.length) {
        longest_palindrome = word;
      }
    }
  } //end of each word loop

  // debatably the most challenging problem on the planet
  // define/assign array to make letters of the alphabet iterable
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // empty array defined/assigned to store each letter as applicable per code block parameters/guidelines
  let lettersThatDontHaveWordsThatDoubleThem = [];

  // for of loop to check each letter of the alphabet in turn
  for (const letter of alphabet) {
    //every letter
    let doubleLetterWordExists = false;
    // for of loop to check each word of the words in turn
    for (const word of allWords) {
      //every word for every letter
      if (word.includes(`${letter}${letter}`)) {
        doubleLetterWordExists = true;
        break; //stops the word loop but not the letter loop
      }
    } //ends the word loop
    if (!doubleLetterWordExists) {
      //only runs after all words have been checked
      lettersThatDontHaveWordsThatDoubleThem.push(letter);
    }
  } //ends the letter loop

  // option to refactor the code for more advanced coders (of course:~)
  //   const lettersWithoutDupes = alphabet.filter((letter) => {
  //     for (const word of allWords) {
  //       if (word.includes(`${letter}${letter}`)) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });

  //   console.log(
  //     `Letters that don't have words where the letter repeats itself:`,
  //     lettersWithoutDupes
  //   );

  console.log(`Q Count: `, q_count);
  console.log(`X Count: `, x_count);
  console.log(`Z Count: `, z_count);
  //after all words are checked
  if (q_count < x_count && q_count < z_count) {
    console.log("The least common letter of q, x, and z is: 'Q'");
  } else if (x_count < q_count && x_count < z_count) {
    console.log("The least common letter of q, x, and z is: 'X'");
  } else if (z_count < x_count && z_count < q_count) {
    console.log("The least common letter of q, x, and z is: 'Z'");
  } else {
    console.log(
      "Out of q, x and z, there is a tie between at least two letters."
    );
  }

  console.log(`The longest palindrom is: ${longest_palindrome}`);

  console.log("Words containing 'type':", typeCounter);
  //   console.log("Words containing 'type':", type_substr.length);
  console.log("Words ending with 'ghtly':", ghtly_words);
  console.log("Shortest word with all vowels is: ", shortest_word);
  console.log("Longest word with no vowels is: ", longest_word);
  console.log(
    `Letters that don't have words where the letter repeats itself:`,
    lettersThatDontHaveWordsThatDoubleThem
  );
};
readlines();
