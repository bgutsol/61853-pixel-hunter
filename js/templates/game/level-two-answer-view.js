import LevelView from './level-view.js';

export default class LevelTwoAnswersView extends LevelView {
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
