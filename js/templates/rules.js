import {createElement, changeView} from '../util';
import getHeader from './header';
import FooterView from './footer-view';
import RulesView from './rules-view';
import getGame from './game/game';

export default () => {

  const mainContainer = createElement();
  const rules = new RulesView();
  const header = getHeader();
  const footer = new FooterView();

  rules.onInput = (value) => {
    rules.btnSubmit.disabled = !value;
  };

  rules.onSubmit = () => {
    changeView(getGame());
  };

  mainContainer.appendChild(header);
  mainContainer.appendChild(rules.element);
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
