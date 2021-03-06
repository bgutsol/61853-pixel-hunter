import LevelView from './level-view.js';
import {ImageType} from '../../data/quest-data';

const getAnswerType = (answers) => {
  const paintTypeLength = answers.filter((answer) => answer.imgType === ImageType.PAINT).length;

  if (paintTypeLength > 1) {
    return ImageType.PHOTO;
  }
  return ImageType.PAINT;
};

export default class LevelOneOfThreeView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._contentClass = `game__content--triple`;
    this._hasFormInputs = false;
  }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    const correctAnswerType = getAnswerType(this.data.answers);
    const correctAnswerIndex = this.data.answers.findIndex((answer) => answer.imgType === correctAnswerType);

    const handleOptionClick = (e) => {
      const target = e.target;
      const targetOptionIndex = parseInt(target.getAttribute(`data-index`), 10);

      this.onAnswer(targetOptionIndex === correctAnswerIndex);
    };

    for (const option of options) {
      option.addEventListener(`click`, handleOptionClick);
    }
  }
}
