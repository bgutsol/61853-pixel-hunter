import Application from '../../application';
import Header from '../header/header-presenter';
import Footer from '../footer/footer-view';
import RulesView from './rules-view';

export default class RulesPresenter {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.content = new RulesView();
    this.handleAction();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  get element() {
    return this.root;
  }

  handleAction() {
    this.content.onInput = (value) => {
      this.content.btnSubmit.disabled = !value;
    };

    this.content.onSubmit = (userName) => {
      Application.showGame(userName);
    };
  }
}
