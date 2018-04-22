import {INITIAL_STATE, updateState} from '../data/quest';
import {QUEST_DATA, GAME_TYPES, IMAGE_TYPES, ANSWER_TYPES} from '../data/quest-data';
import {createElement, changeView} from '../util';
import getFooter from './footer';
import getLevel from './level';
import HeaderView from './header-view';
import getTotalStats from './total-stats';

const setHandlerTwoAnswers = (template, [answer1, answer2], callback) => {
  const inputs = template.querySelectorAll(`input[type=radio]`);
  const inputsByName = {};
  const handleInputChange = function (e) {
    const input = e.target;
    inputsByName[input.name] = input.value;

    if (inputsByName.question0 && inputsByName.question1) {
      callback(inputsByName.question0 === answer1.imgType && inputsByName.question1 === answer2.imgType);
    }
  };

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(`change`, handleInputChange);
  }
};

const setHandlerOneAnswer = (template, [answer], callback) => {
  const inputs = template.querySelectorAll(`input[type=radio]`);
  const handleInputChange = function (e) {
    const input = e.target;

    callback(input.value === answer.imgType);
  };

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(`change`, handleInputChange);
  }
};

const setHandlerChoosePaint = (template, answers, callback) => {
  const options = template.querySelectorAll(`.game__option`);
  const handleOptionClick = (e) => {
    const target = e.target;
    const targetOptionIndex = parseInt(target.getAttribute(`data-index`), 10);
    const correctAnswerIndex = answers.findIndex((answer) => answer.imgType === IMAGE_TYPES.paint);

    callback(targetOptionIndex === correctAnswerIndex);
  };

  for (let i = 0; i < options.length; i++) {
    options[i].addEventListener(`click`, handleOptionClick);
  }
};

const setEventsHandler = (template, data, callback) => {
  switch (data.type) {
    case GAME_TYPES.chooseTwoAnswers:
      setHandlerTwoAnswers(template, data.answers, callback);
      break;
    case GAME_TYPES.chooseOneAnswer:
      setHandlerOneAnswer(template, data.answers, callback);
      break;
    case GAME_TYPES.choosePaint:
      setHandlerChoosePaint(template, data.answers, callback);
      break;
  }
};

const changeLevel = (state = INITIAL_STATE, answers = [], gameStats = []) => {
  const gameContainer = createElement();
  const currentLevelData = QUEST_DATA[state.level];

  const handleAnswer = (answerType) => {
    let newState = updateState(state, {level: state.level + 1});

    answers.push({
      isCorrect: answerType,
      time: 15
    });

    if (answerType) {
      gameStats.push(ANSWER_TYPES.correct);
    } else {
      gameStats.push(ANSWER_TYPES.wrong);
    }

    if (!answerType) {
      newState = updateState(newState, {lives: state.lives - 1});
    }

    if (newState.level === QUEST_DATA.length || newState.lives === 0) {
      changeView(getTotalStats(state, answers, gameStats));
      return;
    }

    changeView(changeLevel(newState, answers, gameStats));
  };

  const levelElement = getLevel(currentLevelData, gameStats);
  setEventsHandler(levelElement, currentLevelData, handleAnswer);

  const header = new HeaderView(state);
  gameContainer.appendChild(header.element);
  gameContainer.appendChild(levelElement);
  gameContainer.appendChild(getFooter());

  return gameContainer;
};


export default changeLevel;
