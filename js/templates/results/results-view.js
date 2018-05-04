import AbstractView from '../abstract-view';
import SingleResult from './single-result-view';

export default class ResultsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
  }

  get template() {
    return `<div class="result">
    ${this.titleHtml}
    ${this.resultsHtml}
    </div>`;
  }

  get titleHtml() {
    if (this.results[0].lives > 0) {
      return `<h1>Победа!</h1>`;
    }
    return ``;
  }

  get resultsHtml() {
    return this.results.map((result, index) => {
      return new SingleResult(result, index).template;
    }).join(``);
  }
}
