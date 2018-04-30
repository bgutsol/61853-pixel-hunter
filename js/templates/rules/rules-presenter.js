import Application from '../../application';
import Header from '../components/header-view';
import Footer from '../components/footer-view';
import RulesView from './rules-view';

export default class RulesPresenter {
  constructor() {
    this.header = new Header();
    this.header.onBtnBackClick = this.return;
    this.footer = new Footer();
    this.content = new RulesView();
    this.content.onSubmit = this.submit;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  get element() {
    return this.root;
  }

  submit(playerName) {
    Application.showGame(playerName);
  }

  return() {
    Application.showGreeting();
  }
}
