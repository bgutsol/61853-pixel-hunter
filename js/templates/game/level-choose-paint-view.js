import LevelView from './level-view.js';
import {IMAGE_TYPES} from '../../data/quest-data';

export default class LevelChoosePaintView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._contentClass = `game__content--triple`;
    this._hasFormInputs = false;
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
