import {createElement} from '../util';
import getHeader from './header';
import FooterView from './footer-view';
import TotalStatsView from './total-stats-view';

export default ({state, answers, stats}) => {
  const mainContainer = createElement();
  const statsHtml = TotalStatsView.getHtml(state, answers, stats);
  const header = getHeader();
  const footer = new FooterView();

  mainContainer.appendChild(header.element);
  mainContainer.appendChild(createElement(statsHtml));
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
