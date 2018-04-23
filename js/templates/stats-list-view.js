import AbstractView from '../abstract-view';
import {ANSWER_TYPES} from '../data/quest-data';

const drawStatResults = (stats) => {
  const defaultArray = new Array(10 - stats.length).fill(ANSWER_TYPES.unknown);
  const statsArray = [...stats, ...defaultArray];

  return statsArray.map((mod) => {
    return `<li class="stats__result stats__result--${mod}"></li>`;
  }).join(``);
};

export default class StatsListView extends AbstractView {
  constructor(stats) {
    super();

    this.stats = stats;
  }

  get template() {
    return `<ul class="stats">${drawStatResults(this.stats)}</ul>`;
  }
}
