import AbstractView from '../abstract-view';
import {IMAGE_TYPES} from '../data/quest-data';
import StatsListView from './stats-list-view';

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

class LevelView extends AbstractView {
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

  onAnswer() {}
}

class LevelTwoAnswersView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._imgSize = {
      width: 468,
      height: 458
    };
  }

  bind() {
    const inputs = this.element.querySelectorAll(`input[type=radio]`);
    const inputsByName = {};
    const handleInputChange = (e) => {
      const input = e.target;
      inputsByName[input.name] = input.value;

      if (inputsByName.question0 && inputsByName.question1) {
        this.onAnswer(inputsByName.question0 === this.data.answers[0].imgType && inputsByName.question1 === this.data.answers[1].imgType);
      }
    };

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener(`change`, handleInputChange);
    }
  }
}

class LevelOneAnswerView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._contentClass = `game__content--wide`;
    this._imgSize = {
      width: 705,
      height: 455
    };
  }

  bind() {
    const inputs = this.element.querySelectorAll(`input[type=radio]`);
    const handleInputChange = (e) => {
      const input = e.target;
      this.onAnswer(input.value === this.data.answers[0].imgType);
    };

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener(`change`, handleInputChange);
    }
  }
}

class LevelChoosePaintView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._contentClass = `game__content--triple`;
    this._hasFormInputs = false;
    this._imgSize = {
      width: 304,
      height: 455
    };
  }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    const handleOptionClick = (e) => {
      const target = e.target;
      const targetOptionIndex = parseInt(target.getAttribute(`data-index`), 10);
      const correctAnswerIndex = this.data.answers.findIndex((answer) => answer.imgType === IMAGE_TYPES.paint);

      this.onAnswer(targetOptionIndex === correctAnswerIndex);
    };

    for (let i = 0; i < options.length; i++) {
      options[i].addEventListener(`click`, handleOptionClick);
    }
  }
}

export {LevelTwoAnswersView, LevelOneAnswerView, LevelChoosePaintView};
