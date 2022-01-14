//Telling Node to Use FS System
//Using this because Node is in transition to fully support import/export
const fs = require("fs");
//helps break up raw input into individual lines
const readline = require("readline");
//creates instance of package to accept the file name THEN uses FS to read the file and pass that to new instance of readline package that was created
const readliner = readline.createInterface({
  input: fs.createReadStream("sowpods.txt"),
});

//tests readliner doing what it is supposed to do
// console.log(readliner);

//accesses await via async fn THEN for loop that waits for readliner to be ready before each iteration of the loop (line 15) AND when the word is ready then stores the word into variable word THEN console.log to output in terminal THEN line 19 tells the fn to run
const readlines = async () => {
  let uu_words = [];
  let xyz_words = [];
  let q_not_u_words = [];
  let cat_5letter_words = [];
  let no_eora_15letters_words = [];
  let bandx_under5letters_words = [];
  let y_startandend_words = [];
  let no_vowel_ory_words = [];
  let vowels_in_anyorder_words = [];
  let vowels_alphaorder_words = [];

  for await (const word of readliner) {
    if (word.includes("UU")) {
      uu_words.push(word);
    }
    if (word.includes("X") && word.includes("Y") && word.includes("Z")) {
      xyz_words.push(word);
    }
    if (word.includes("Q") && !word.includes("U")) {
      q_not_u_words.push(word);
    }
    if (word.includes("CAT") && word.length === 5) {
      cat_5letter_words.push(word);
    }
    //helpful here was to move the length attribute to the beginning of the if followed by the or enclosed in parentheses for proper logic flow per requirements of the problem ANOTHER POSSIBLE OPTION (IF OR MEANS CAN HAVE ONE BUT NOT OTHER A v E): if (word.length >= 15 && (!word.includes("E") || !word.includes("A")))
    if (word.length >= 15 && !word.includes("E") && !word.includes("A")) {
      no_eora_15letters_words.push(word);
    }
    if (word.includes("B") && word.includes("X") && word.length < 5) {
      bandx_under5letters_words.push(word);
    }
    //tests index for character in first position
    // const firstLetter = word.charAt(0);
    //tests index for character in last position
    // const lastLetter = word.charAt(word.length - 1);
    if (word.charAt(0) === "Y" && word.charAt(word.length - 1) === "Y") {
      y_startandend_words.push(word);
    }
    if (
      !word.includes("A") &&
      !word.includes("E") &&
      !word.includes("I") &&
      !word.includes("O") &&
      !word.includes("U") &&
      !word.includes("Y")
    ) {
      no_vowel_ory_words.push(word);
    }
    if (
      word.includes("A") &&
      word.includes("E") &&
      word.includes("I") &&
      word.includes("O") &&
      word.includes("U")
    ) {
      vowels_in_anyorder_words.push(word);
    }
    if (
      word.includes("A") &&
      word.includes("E") &&
      word.includes("I") &&
      word.includes("O") &&
      word.includes("U")
    ) {
      const aPos = word.indexOf("A");
      const ePos = word.indexOf("E");
      const iPos = word.indexOf("I");
      const oPos = word.indexOf("O");
      const uPos = word.indexOf("U");

      if (aPos < ePos && ePos < iPos && iPos < oPos && oPos < uPos) {
        vowels_alphaorder_words.push(word);
      }
    }
  }

  //statements to allow output of results in terminal
  console.log("Words containing 'uu':", uu_words);
  console.log("Words containing 'x', 'y', and'z':", xyz_words);
  console.log("Words containing 'q' and not 'u':", q_not_u_words);
  console.log(
    "Words containing 'cat' and are five letters long:",
    cat_5letter_words
  );
  console.log(
    "Words containing no 'e' or 'a' and are at least 15 letters long:",
    no_eora_15letters_words
  );
  console.log(
    "Words containing 'b' and 'x' and are less than five letters long:",
    bandx_under5letters_words
  );
  console.log("Words starting and ending with 'y':", y_startandend_words);
  console.log("Words without vowels including 'y':", no_vowel_ory_words);
  console.log("Words with all vowels in any order:", vowels_in_anyorder_words);
  console.log("Words with all vowels in alpha order:", vowels_alphaorder_words);
};

//invokes function to output results in terminal
readlines();
