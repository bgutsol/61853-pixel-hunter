import {ANSWER_TYPES} from '../data/quest-data';

export default (stats) => {
  const defaultArray = new Array(10 - stats.length).fill(ANSWER_TYPES.unknown);
  const statsArray = [...stats, ...defaultArray];

  const statResultsHtml = statsArray.map((mod) => {
    return `<li class="stats__result stats__result--${mod}"></li>`;
  }).join(``);

  return `<ul class="stats">${statResultsHtml}</ul>`;
};
