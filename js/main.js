const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");

let word;
let maxGuesses;
let incorrects = [];
let corrects = [];

function randomWord() {
  // getting random object from wordList
  let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randomObj.word; // getting word of random Object
  maxGuesses = 8;
  corrects = [];
  incorrects = [];

  hint.innerText = randomObj.hint; // getting hint of random Object
  guessLeft.innerHTML = maxGuesses;
  wrongLetter.innerHTML = incorrects;

  let temp = "";
  for(let i = 0; i < word.length; i++) {
    temp += `<input type="text" disabled>`;
  }
  inputs.innerHTML = temp;
}
randomWord();

function initGame(e) {
  let key = e.target.value;
  if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
    if(word.includes(key)) { // if user letter found in the word
      for(let i = 0; i < word.length; i++) {
        // showing matched letter in the input value
        if(word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--; // decrement maxGuesses by 1
      incorrects.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";
  setTimeout(() => {
    if(corrects.length == word.length){ // if user found all letters
      alert(`Very Good! You Found the word ${word.toUpperCase()}`);
      randomWord(); // calling randomword func, so the game reset
    } else if(maxGuesses < 1) { // if user couldn't found all letters
      alert("Game over! You don't have remaining guesses");
      for(let i = 0; i < word.length; i++) {
        // show all letters in the input
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());