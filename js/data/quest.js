export const INITIAL_STATE = {
  level: 0,
  lives: 3,
  time: 0
};

export const updateState = (oldState, newState) => {
  return Object.assign({}, oldState, newState);
};

export const calculateResult = (userAnswers, remainingLives) => {
  // check arguments types
  if (!Array.isArray(userAnswers)) {
    throw new Error(`userAnswers should be of type array`);
  }
  if (typeof remainingLives !== `number`) {
    throw new Error(`remainingLives should be of type number`);
  }

  // check arguments incorrect value
  if (remainingLives < 0) {
    throw new Error(`remainingLives should not be negative value`);
  }
  if (remainingLives > 3) {
    throw new Error(`remainingLives value should not be more then 3`);
  }
  if (userAnswers.length < 10) {
    return -1;
  }

  // calculate result
  let result = 0;

  userAnswers.forEach((answer) => {
    if (typeof answer !== `object`) {
      throw new Error(`userAnswers array should have values of type object`);
    }

    const {isCorrect, time} = answer;

    if (!isCorrect) {
      return;
    }

    result += 100;

    if (time < 10) {
      result += 50;
      return;
    }

    if (time > 20) {
      result -= 50;
    }
  });

  result += 50 * remainingLives;

  return result;
};


export const createTimer = function (time) {
  // check argument type
  if (typeof time !== `number`) {
    throw new Error(`time should be of type number`);
  }

  // check argument incorrect value
  if (time <= 0) {
    throw new Error(`time should be positive value`);
  }

  return {
    time,
    isOver: false,
    tick() {
      if (this.isOver) {
        return;
      }

      this.time -= 1;

      if (this.time === 0) {
        this.isOver = true;
      }
    }
  };
};
