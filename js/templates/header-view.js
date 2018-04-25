import AbstractView from '../abstract-view';

export default class HeaderView extends AbstractView {
  constructor(time, livesMods) {
    super();
    this.time = time;
    this.livesMods = livesMods;
  }

  get template() {
    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${this.timeHtml}
    ${this.livesHtml}
    </header>`;
  }

  get timeHtml() {
    if (typeof this.time === `undefined`) {
      return ``;
    }
    return `<h1 class="game__timer">${this.time}</h1>`;
  }

  get livesHtml() {
    if (!this.livesMods) {
      return ``;
    }

    const livesImgs = this.livesMods.map((mod) => {
      return `<img src="img/heart__${mod}.svg" class="game__heart" alt="Life" width="32" height="32">`;
    }).join(``);
    return `<div class="game__lives">${livesImgs}</div>`;
  }

  onBtnBackClick() {}

  bind() {
    const btnBack = this.element.querySelector(`.back`);

    btnBack.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onBtnBackClick();
    });
  }
}
