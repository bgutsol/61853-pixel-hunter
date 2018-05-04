import Application from '../../application';
import Header from '../components/header-view';
import Footer from '../components/footer-view';
import ResultsView from './results-view';
import Loader from '../../data/loader';

const sortResults = (results) => {
  return results.sort((first, second) => second.date - first.date);
};

export default class ResultsPresenter {
  constructor(results, playerName) {
    this.results = results;
    this.playerName = playerName;

    this.header = new Header();
    this.header.onBtnBackClick = this.comeback.bind(this);
    this.footer = new Footer();
    this.content = new ResultsView([this.results]);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);

    this.updateResultsFromServer();
  }

  comeback() {
    Application.showGame(this.playerName);
  }

  get element() {
    return this.root;
  }

  updateResultsFromServer() {
    Loader.uploadResults(this.results, this.playerName).
        then(() => Loader.loadResults(this.playerName)).
        then((data) => this.updateContent(data));
  }

  updateContent(results) {
    const content = new ResultsView(sortResults(results));
    this.root.replaceChild(content.element, this.content.element);
    this.content = content;
  }
}
