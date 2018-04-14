import {INITIAL_STATE, updateState} from '../data/quest';
import {QUEST_DATA, GAME_TYPES} from '../data/quest-data';
import {createElement, changeView} from '../util';
import getFooter from './footer';
import getLevel from './level';
import getHeader from './header';
import stats from './stats';

const setHandlerTwoAnswers = (template, callback) => {
  const inputs = template.querySelectorAll(`input[type=radio]`);
  const inputsByName = {};
  const handleInputChange = function (e) {
    const input = e.target;
    inputsByName[input.name] = input.checked;

    if (inputsByName.question1 && inputsByName.question2) {
      callback(true);
    }
  };

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(`change`, handleInputChange);
  }
};

const setHandlerOneAnswer = (template, callback) => {
  const inputs = template.querySelectorAll(`input[type=radio]`);
  const handleInputChange = function (e) {
    const input = e.target;

    callback(true);
  };

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(`change`, handleInputChange);
  }
};

const setHandlerChoosePaint = (template, callback) => {
  const answers = template.querySelectorAll(`.game__option`);
  const handleAnswerClick = (e) => {
    const target = e.target;

    callback(true);
  };

  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener(`click`, handleAnswerClick);
  }
};

const setEventsHandler = (template, type, callback) => {

  switch (type) {
    case GAME_TYPES.chooseTwoAnswers:
      setHandlerTwoAnswers(template, callback);
      break;
    case GAME_TYPES.chooseOneAnswer:
      setHandlerOneAnswer(template, callback);
      break;
    case GAME_TYPES.choosePaint:
      setHandlerChoosePaint(template, callback);
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
  setEventsHandler(levelElement, currentLevelData.type, handleAnswer);

  gameContainer.appendChild(getHeader(state));
  gameContainer.appendChild(levelElement);
  gameContainer.appendChild(getFooter());

  return gameContainer;
};


export default changeLevel;
