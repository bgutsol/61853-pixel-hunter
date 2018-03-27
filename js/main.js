const mainScreen = document.querySelector(`main.central`);
const screensArray = document.querySelectorAll(`template`);
let currentScreenNumber = 0;
const pressedKeys = {};

const changeScreen = (screenNumber) => {
  if (screenNumber < 0 || screenNumber >= screensArray.length) {
    return;
  }

  mainScreen.innerHTML = screensArray[screenNumber].innerHTML;
  currentScreenNumber = screenNumber;
};

const handleDocumentKeyPress = function (e) {
  pressedKeys[e.keyCode] = (e.type === `keydown`);

  if (pressedKeys[18] && pressedKeys[39] || pressedKeys[37]) {
    e.preventDefault();
    let nextScreenNumber = currentScreenNumber;

    if (pressedKeys[39]) {
      if (nextScreenNumber === screensArray.length - 1) {
        return;
      }
      nextScreenNumber++;
    }

    if (pressedKeys[37]) {
      if (nextScreenNumber === 0) {
        return;
      }
      nextScreenNumber--;
    }

    changeScreen(nextScreenNumber);
  }
};

changeScreen(0);
document.onkeydown = document.onkeyup = handleDocumentKeyPress;
