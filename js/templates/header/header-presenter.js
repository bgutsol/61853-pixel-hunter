import Application from '../../application';
import HeaderView from './header-view';

const MAX_LIVES = 3;

const getLivesMods = (lives) => {
  const emptyLives = new Array(MAX_LIVES - lives).fill(`empty`);
  const fullLives = new Array(lives).fill(`full`);
  return [...emptyLives, ...fullLives];
};

export default class HeaderPresenter {
  constructor(state) {
    this.state = state;

    this.content = this.createContent();
    this.content.onBtnBackClick = () => {
      Application.showGreeting();
    };

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }

  createContent() {
    if (this.state) {
      const {time, lives} = this.state;
      const livesMods = getLivesMods(lives);
      return new HeaderView(time, livesMods);
    }
    return new HeaderView();
  }

  get element() {
    return this.root;
  }
}
