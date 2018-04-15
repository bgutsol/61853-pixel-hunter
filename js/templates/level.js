import {createElement} from '../util';
import {GAME_TYPES} from '../data/quest-data';

const getOptionFormElemHtml = (type, number) => {
  if (type === GAME_TYPES.chooseTwoAnswers || type === GAME_TYPES.chooseOneAnswer) {
    return `<label class="game__answer game__answer--photo">
          <input name="question${number}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${number}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>`;
  }

  return ``;
};

const getOptionHtml = (answer, number, type) => {
  const optionFormElemHtml = getOptionFormElemHtml(type, number);

  return `<div class="game__option" data-index="${number}">
  <img src="${answer.img.src}"
    alt="Option ${number}"
    width="${answer.img.width}"
    height="${answer.img.height}">
  ${optionFormElemHtml}
  </div>`;
};

const getContentHtml = (answers, type) => {
  const optionsHtml = answers.map((answer, index) => getOptionHtml(answer, index + 1, type)).join(``);
  let contentMod = ``;

  if (answers.length === 3) {
    contentMod = `game__content--triple`;
  } else if (answers.length === 1) {
    contentMod = `game__content--wide`;
  }

  return `<form class="game__content ${contentMod}">${optionsHtml}</form>`;
};


const getStatsHtml = (stats) => {
  const statResultsHtml = stats.map((mod) => {
    return `<li class="stats__result stats__result--${mod}"></li>`;
  }).join(``);

  return `<div class="stats"><ul class="stats">${statResultsHtml}</ul></div>`;
};

export default (data, stats = []) => {
  const html = `
  <div class="game">
    <p class="game__task">${data.task}</p>
    ${getContentHtml(data.answers, data.type)}
    ${getStatsHtml(stats)}
  </div>`;

  const template = createElement(html);

  return template;
};
