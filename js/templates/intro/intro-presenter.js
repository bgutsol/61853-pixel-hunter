import Application from '../../application';
import IntroView from './intro-view';

export default class IntroPresenter {
  constructor() {
    this.content = new IntroView();
    this.content.onBtnContinueClick = () => {
      Application.showGreeting();
    };

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }

  get element() {
    return this.root;
  }
}
