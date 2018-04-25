import {INITIAL_STATE, updateState} from '../../data/quest';
import {QUEST_DATA, GAME_TYPES, ANSWER_TYPES} from '../../data/quest-data';
import {createElement, changeView} from '../../util';
import FooterView from '.././footer-view';
import getHeader from '.././header';
import getTotalStats from '.././total-stats';
import LevelTwoAnswersView from './level-two-answer-view';
import LevelOneAnswerView from './level-one-answer-view';
import LevelChoosePaintView from './level-choose-paint-view';


const getLevel = (data, stats = []) => {
  switch (data.type) {
    case GAME_TYPES.chooseTwoAnswers:
      return new LevelTwoAnswersView(data, stats);
    case GAME_TYPES.chooseOneAnswer:
      return new LevelOneAnswerView(data, stats);
    case GAME_TYPES.choosePaint:
      return new LevelChoosePaintView(data, stats);
    default:
      return null;
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

  const level = getLevel(currentLevelData, gameStats);
  const header = getHeader(state);
  const footer = new FooterView();

  level.onAnswer = handleAnswer;

  gameContainer.appendChild(header);
  gameContainer.appendChild(level.element);
  gameContainer.appendChild(footer.element);

  return gameContainer;
};

export default changeLevel;
