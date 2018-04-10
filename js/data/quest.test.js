import {assert} from 'chai';
import {calculateResult, createTimer} from './quest';

describe(`Check result calculator`, () => {
  const avarageAnswers = [];
  for (let i = 0; i < 10; i++) {
    avarageAnswers[i] = {
      isCorrect: true,
      time: 15
    };
  }

  // check arguments correct values
  it(`should return -1 when userAnswers array length less then 10`, () => {
    assert.equal(-1, calculateResult([], 3));
  });
  it(`should return 1150 when all answers are correct, and answers speed is avarage, and remainingLives is 3`, () => {
    assert.equal(1150, calculateResult(avarageAnswers, 3));
  });
  it(`should return 700 when 7 answers are correct, and answers speed is avarage, and remainingLives is 0`, () => {
    const answers = [
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: false, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: false, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: false, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
    ];
    assert.equal(700, calculateResult(answers, 0));
  });
  it(`should return 1250 when 8 answers are correct, and answers speed is less then 10, and remainingLives is 1`, () => {
    const answers = [
      {isCorrect: true, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: false, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: false, time: 7},
      {isCorrect: true, time: 7},
      {isCorrect: true, time: 7},
    ];
    assert.equal(1250, calculateResult(answers, 1));
  });
  it(`should return 1650 when all answers are correct, and answers speed is less then 10, and remainingLives is 3`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers[i] = {
        isCorrect: true,
        time: 5
      };
    }
    assert.equal(1650, calculateResult(answers, 3));
  });
  it(`should return 650 when all answers are correct, and answers speed is more then 20, and remainingLives is 3`, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      answers[i] = {
        isCorrect: true,
        time: 25
      };
    }
    assert.equal(650, calculateResult(answers, 3));
  });

  // check arguments incorrect values
  it(`should not allow set negative values to remainingLives`, () => {
    assert.throws(() => calculateResult(avarageAnswers, -1), /remainingLives should not be negative value/);
  });
  it(`should not allow set remainingLives value more then 3`, () => {
    assert.throws(() => calculateResult(avarageAnswers, 4), /remainingLives value should not be more then 3/);
    assert.throws(() => calculateResult(avarageAnswers, 100), /remainingLives value should not be more then 3/);
  });

  // check arguments types
  it(`should not allow set userAnswers non array value`, () => {
    assert.throws(() => calculateResult(`test`, 3), /userAnswers should be of type array/);
    assert.throws(() => calculateResult({}, 3), /userAnswers should be of type array/);
  });
  it(`should not allow set userAnswers array with non object value`, () => {
    assert.throws(() => calculateResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3), /userAnswers array should have values of type object/);
  });
  it(`should not allow set remainingLives with non number value`, () => {
    assert.throws(() => calculateResult(avarageAnswers, `shj`), /remainingLives should be of type number/);
    assert.throws(() => calculateResult(avarageAnswers, false), /remainingLives should be of type number/);
    assert.throws(() => calculateResult(avarageAnswers, []), /remainingLives should be of type number/);
  });

});


describe(`Check timer creator`, () => {

  // check argument correct values
  it(`should return object`, () => {
    assert.equal(`object`, typeof createTimer(1));
  });
  it(`should reduce field time by one, every time when function tick() called`, () => {
    const time = 30;
    const timer = createTimer(time);
    timer.tick();
    assert.equal(time - 1, timer.time);
    timer.tick();
    timer.tick();
    timer.tick();
    assert.equal(time - 4, timer.time);
  });
  it(`should set field isOver to true, when time is 0`, () => {
    const time = 1;
    const timer = createTimer(time);
    timer.tick();
    assert.equal(true, timer.isOver);
  });
  it(`should not reduce time, when time is 0`, () => {
    const time = 1;
    const timer = createTimer(time);
    timer.tick();
    timer.tick();
    assert.equal(0, timer.time);
    timer.tick();
    timer.tick();
    timer.tick();
    assert.equal(0, timer.time);
  });

  // check argument incorrect values
  it(`should not allow set non positive values to time`, () => {
    assert.throws(() => createTimer(0), /time should be positive value/);
    assert.throws(() => createTimer(-1), /time should be positive value/);
    assert.throws(() => createTimer(-100), /time should be positive value/);
  });

  // check argument type
  it(`should not allow set time with non number value`, () => {
    assert.throws(() => createTimer(`shj`), /time should be of type number/);
    assert.throws(() => createTimer(false), /time should be of type number/);
    assert.throws(() => createTimer([]), /time should be of type number/);
  });
});
