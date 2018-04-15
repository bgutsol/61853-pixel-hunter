import {createElement} from '../util';
import {GAME_TYPES, ANSWER_TYPES} from '../data/quest-data';
import getStatsListHtml from './stats-list';

const getOptionFormInputsHtml = (number) => {
  return `<label class="game__answer game__answer--photo">
        <input name="question${number}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${number}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
};

const getOptionHtml = (imgSrc, imgSize, number, withFormInputs) => {
  let optionFormInputsHtml = ``;
  if (withFormInputs) {
    optionFormInputsHtml = getOptionFormInputsHtml(number);
  }

  return `<div class="game__option" data-index="${number}">
  <img src="${imgSrc}"
    alt="Option ${number}"
    width="${imgSize.width}"
    height="${imgSize.height}">
  ${optionFormInputsHtml}
  </div>`;
};

const getTwoAnswersHtml = (answers) => {
  const IMG_SIZE = {
    width: 468,
    height: 458
  };
  const optionsHtml = answers.map((answer, index) => getOptionHtml(answer.imgSrc, IMG_SIZE, index, true)).join(``);

  return `<form class="game__content">${optionsHtml}</form>`;
};

const getOneAnswerHtml = (answers) => {
  const IMG_SIZE = {
    width: 705,
    height: 455
  };
  const optionsHtml = answers.map((answer, index) => getOptionHtml(answer.imgSrc, IMG_SIZE, index, true)).join(``);

  return `<form class="game__content game__content--wide">${optionsHtml}</form>`;
};

const getChoosePaintHtml = (answers) => {
  const IMG_SIZE = {
    width: 304,
    height: 455
  };
  const optionsHtml = answers.map((answer, index) => getOptionHtml(answer.imgSrc, IMG_SIZE, index, false)).join(``);

  return `<form class="game__content game__content--triple">${optionsHtml}</form>`;
};

const getContentHtml = (answers, gameType) => {
  switch (gameType) {
    case GAME_TYPES.chooseTwoAnswers:
      return getTwoAnswersHtml(answers);
    case GAME_TYPES.chooseOneAnswer:
      return getOneAnswerHtml(answers);
    case GAME_TYPES.choosePaint:
      return getChoosePaintHtml(answers);
    default:
      return ``;
  }
};

export default (data, stats = []) => {
  const html = `
  <div class="game">
    <p class="game__task">${data.task}</p>
    ${getContentHtml(data.answers, data.type)}
    <div class="stats">
      ${getStatsListHtml(stats)}
    </div>
  </div>`;

  return createElement(html);
};
