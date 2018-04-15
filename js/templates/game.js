import {INITIAL_STATE, updateState} from '../data/quest';
import {QUEST_DATA, GAME_TYPES, IMAGE_TYPES} from '../data/quest-data';
import {createElement, changeView} from '../util';
import getFooter from './footer';
import getLevel from './level';
import getHeader from './header';
import stats from './stats';

const setHandlerTwoAnswers = (template, [answer1, answer2], callback) => {
  const inputs = template.querySelectorAll(`input[type=radio]`);
  const inputsByName = {};
  const handleInputChange = function (e) {
    const input = e.target;
    inputsByName[input.name] = input.value;

    if (inputsByName.question1 && inputsByName.question2) {
      callback(inputsByName.question1 === answer1.type && inputsByName.question2 === answer2.type);
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

    callback(input.value === answer.type);
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
    const correctAnswerIndex = answers.findIndex((answer) => answer.type === IMAGE_TYPES.paint);

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

const changeLevel = (state = INITIAL_STATE, answers = []) => {
  const gameContainer = createElement();
  const currentLevelData = QUEST_DATA[state.level];

  const handleAnswer = (answerType) => {
    const newState = {
      level: state.level + 1
    };

    answers.push({
      isCorrect: answerType,
      time: 15
    });

    if (!answerType) {
      newState.lives = state.lives - 1;
    }

    if (newState.lives === 0) {
      changeView(stats);
      return;
    }

    if (state.level === QUEST_DATA.length - 1) {
      changeView(stats);
      return;
    }

    changeView(changeLevel(updateState(state, newState), answers));
  };

  const levelElement = getLevel(currentLevelData);
  setEventsHandler(levelElement, currentLevelData, handleAnswer);

  gameContainer.appendChild(getHeader(state));
  gameContainer.appendChild(levelElement);
  gameContainer.appendChild(getFooter());

  return gameContainer;
};


export default changeLevel;
