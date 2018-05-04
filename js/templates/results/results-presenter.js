import Application from '../../application';
import Header from '../components/header-view';
import Footer from '../components/footer-view';
import ResultsView from './results-view';

const sortResults = (results) => {
  return results.sort((first, second) => second.date - first.date);
};

export default class ResultsPresenter {
  constructor(results, playerName) {
    this.results = sortResults(results);
    this.playerName = playerName;

    this.header = new Header();
    this.header.onBtnBackClick = this.comeback.bind(this);
    this.footer = new Footer();
    this.content = new ResultsView(this.results);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  comeback() {
    Application.showGame(this.playerName);
  }

  get element() {
    return this.root;
  }
}
