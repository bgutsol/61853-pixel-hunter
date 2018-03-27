const searchScreensByOrder = (idsArray) => {
  return idsArray.map((item) => {
    return document.querySelector(`template#${item}`);
  });
};

document.addEventListener(`DOMContentLoaded`, () => {
  const screensID = [
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
  ];
  const screensArray = searchScreensByOrder(screensID);
  let currentScreenNumber = 0;
  const pressedKeys = {};

  const changeScreen = (screenNumber) => {
    if (screenNumber < 0 || screenNumber >= screensArray.length) {
      return;
    }
    const mainScreen = document.querySelector(`main.central`);
    const currScreen = document.getElementById(screensArray[screenNumber].id);
    mainScreen.innerHTML = currScreen.innerHTML;
    currentScreenNumber = screenNumber;
  };

  const handleWindowOnload = () => {
    changeScreen(0);
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

  window.onload = handleWindowOnload;
  document.onkeydown = document.onkeyup = handleDocumentKeyPress;
});
