import AbstractView from '../abstract-view';

const MAX_LIVES = 3;

const getLivesMods = (lives) => {
  const emptyLives = new Array(MAX_LIVES - lives).fill(`empty`);
  const fullLives = new Array(lives).fill(`full`);
  return [...emptyLives, ...fullLives];
};

export default class HeaderView extends AbstractView {
  constructor(state, time) {
    super();

    this.time = time;
    if (state) {
      this.livesMods = getLivesMods(state.lives);
    }
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

  get timer() {
    return this.element.querySelector(`.game__timer`);
  }

  updateTime(time) {
    this.timer.textContent = time;
  }

  startTimerBlinking() {
    const INTERVAL = 500;
    let isVisible = true;

    const blink = () => {
      if (isVisible) {
        this.timer.style.display = `none`;
        isVisible = false;
      } else {
        this.timer.style.display = `block`;
        isVisible = true;
      }
    };

    setTimeout(function run() {
      blink();
      setTimeout(run, INTERVAL);
    }, INTERVAL);
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
