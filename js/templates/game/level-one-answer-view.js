import LevelView from './level-view.js';

export default class LevelOneAnswerView extends LevelView {
  constructor(data, stats) {
    super(data, stats);

    this._contentClass = `game__content--wide`;
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
