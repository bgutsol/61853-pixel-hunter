import AbstractView from '../abstract-view';

const MAX_LIVES = 3;

const drawLives = (lives) => {
  if (typeof lives === `undefined`) {
    return ``;
  }
  const emptyLives = new Array(MAX_LIVES - lives).fill(`empty`);
  const fullLives = new Array(lives).fill(`full`);
  const livesImgHtml = [...emptyLives, ...fullLives].map((mod) => {
    return `<img src="img/heart__${mod}.svg" class="game__heart" alt="Life" width="32" height="32">`;
  }).join(``);

  return `<div class="game__lives">${livesImgHtml}</div>`;
};

const drawTimer = (time) => {
  if (typeof time === `undefined`) {
    return ``;
  }
  return `<h1 class="game__timer">${time}</h1>`;
};

export default class HeaderView extends AbstractView {
  constructor(state = {}) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${drawTimer(this.state.time)}
    ${drawLives(this.state.lives)}
  </header>`;
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
