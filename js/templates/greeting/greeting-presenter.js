import Application from '../../application';
import Footer from '../footer/footer-view';
import GreetingView from './greeting-view';

export default class GreetingPresenter {
  constructor() {
    this.footer = new Footer();
    this.content = new GreetingView();
    this.content.onBtnContinueClick = () => {
      Application.showRules();
    };

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  get element() {
    return this.root;
  }
}
