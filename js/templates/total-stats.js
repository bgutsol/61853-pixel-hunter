import {createElement} from '../util';
import getHeader from './header';
import FooterView from './footer-view';
import TotalStatsView from './total-stats-view';

export default (state, answers, gameStats) => {
  const mainContainer = createElement();
  const stats = new TotalStatsView(state, answers, gameStats);
  const header = getHeader();
  const footer = new FooterView();

  mainContainer.appendChild(header);
  mainContainer.appendChild(stats.element);
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
