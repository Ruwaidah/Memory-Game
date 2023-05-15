const gameContainer = document.getElementById("game");
const reStart = document.getElementById("restart");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
console.log(shuffledColors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let isClickable = true;
const cardsFlibped = [];
let points = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const color = event.target.classList.value;
  const div = event.target;
  console.log(points);
  console.log(cardsFlibped.length);
  // To prevent so many clicks in the same time
  if (isClickable) {
    div.style.backgroundColor = color;
  }

  if (cardsFlibped.indexOf(div) >= 0 || !isClickable) {
    console.log(cardsFlibped.indexOf(div) >= 0, div);
  } else if (!sessionStorage.getItem("divColor")) {
    sessionStorage.setItem("divColor", color);
    cardsFlibped.push(div);
  } else {
    isClickable = false;
    setTimeout(() => {
      console.log(sessionStorage.getItem("divColor") !== color);
      if (sessionStorage.getItem("divColor") !== color) {
        div.style.backgroundColor = "white";
        cardsFlibped[cardsFlibped.length - 1].style.backgroundColor = "white";
        cardsFlibped.pop();
      } else {
        points = points + 20;
        cardsFlibped.push(div);
        document.getElementById("score").innerText = `points = ${points}`;
      }
      sessionStorage.clear();
      isClickable = true;
    }, 1000);
  }

  if (cardsFlibped.length === COLORS.length) {
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
console.log(COLORS);

// Restart Button Clicked
function deleteDivs() {
  sessionStorage.clear();
  points = 0;
  const divs = document.querySelector("#game");
  const divColored = document.querySelectorAll("#game div");
  for (let ele of divColored) {
    divs.removeChild(ele);
  }
  shuffle(COLORS);
  createDivsForColors(COLORS);
}
reStart.addEventListener("click", function (e) {
  deleteDivs();
});
