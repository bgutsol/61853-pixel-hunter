import Application from '../../application';
import Header from '../header/header-presenter';
import Footer from '../components/footer-view';
import ResultsView from './results-view';
import {TOTAL_RESULT_TYPES} from '../../data/quest-data';
import {calculateResult} from '../../data/quest';

export default class ResultsPresenter {
  constructor(model) {
    this.model = model;

    this.header = new Header();
    this.footer = new Footer();
    this.content = this.createContent();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  createContent() {
    if (this.model.answers.length < 10) {
      return new ResultsView(TOTAL_RESULT_TYPES.fail, 0, this.model);
    }
    return new ResultsView(TOTAL_RESULT_TYPES.win, this.score, this.model);
  }

  get score() {
    return calculateResult(this.model.answers, this.model.state.lives);
  }

  get element() {
    return this.root;
  }
}
