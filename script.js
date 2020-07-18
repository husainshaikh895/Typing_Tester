const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const result = document.querySelector(".results");

// Add leading zero to numbers 9 or below:
function addZero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}
// Run a standard minute/second/hundredths timer:
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var mistakes = 0;

function startRun() {
  timer[3]++;
  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);

  minutes = addZero(timer[0]);
  seconds = addZero(timer[1]);
  milseconds = addZero(timer[2]);
  theTimer.innerHTML = minutes + ":" + seconds + ":" + milseconds;
}
// Match the text entered with the provided text on the page:
function spellcheck() {
  let enteredtext = testArea.value;
  let originalText = originText.substring(0, enteredtext.length);
  if (enteredtext == originText) {
    clearInterval(interval);
    // calculate typing speed
    minutes = timer[0] = timer[3] / 100 / 60;
    totalWords = originText.slice().length;
    wpm = totalWords / minutes;
    theTimer.classList.add("highlight");
    testWrapper.style.borderColor = "green";
    result.classList.remove("hidden");
    result.classList.add("results-appear");
    result.innerHTML =
      "<h3>You made " +
      mistakes +
      " mistakes" +
      "<br>" +
      "Your typing speed is " +
      Math.floor(wpm) +
      " WPM" +
      "</h3>";
  } else if (enteredtext == originalText) {
    testWrapper.style.borderColor = "lightgreen";
  } else {
    testWrapper.style.borderColor = "red";
    mistakes++;
  }
}
// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    theTimer.classList.remove("highlight");
    timerRunning = true;
    mistakes = 0;
    interval = setInterval(startRun, 10);
  }
  console.log(textEnteredLength);
}
// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timerRunning = false;
  theTimer.innerHTML = "00:00:00";
  timer = [0, 0, 0, 0];
  testArea.value = "";
  mistakes = 0;
  testWrapper.style.borderColor = "grey";
  theTimer.classList.add("highlight");
  result.classList.remove("results-appear");
  result.classList.add("hidden");
}
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
