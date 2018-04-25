import AbstractView from '../../abstract-view';
import StatsListView from '../stats-list-view';

const drawOptionFormInputs = (number) => {
  return `<label class="game__answer game__answer--photo">
        <input name="question${number}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${number}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
};

const drawOption = (imgSrc, imgSize, number, withFormInputs) => {
  let optionFormInputsHtml = ``;
  if (withFormInputs) {
    optionFormInputsHtml = drawOptionFormInputs(number);
  }

  return `<div class="game__option" data-index="${number}">
  <img src="${imgSrc}"
    alt="Option ${number}"
    width="${imgSize.width}"
    height="${imgSize.height}">
  ${optionFormInputsHtml}
  </div>`;
};

export default class LevelView extends AbstractView {
  constructor(data, stats = []) {
    super();

    this.data = data;
    this.stats = stats;
    this._contentClass = ``;
    this._hasFormInputs = true;
    this._imgSize = {};
  }

  get template() {
    const statsList = new StatsListView(this.stats);

    return `
  <div class="game">
    <p class="game__task">${this.data.task}</p>
    ${this.contentHtml}
    <div class="stats">
      ${statsList.template}
    </div>
  </div>`;
  }

  get contentHtml() {
    return `<form class="game__content ${this._contentClass}">${this.optionsHtml}</form>`;
  }

  get optionsHtml() {
    return this.data.answers.map((answer, index) => drawOption(answer.imgSrc, this._imgSize, index, this._hasFormInputs)).join(``);
  }
}
