import {createElement} from '../util';
import getHeader from './header';
import FooterView from './footer-view';
import RulesView from './rules-view';
import Application from '../application';

export default () => {

  const mainContainer = createElement();
  const rules = new RulesView();
  const header = getHeader();
  const footer = new FooterView();

  rules.onInput = (value) => {
    rules.btnSubmit.disabled = !value;
  };

  rules.onSubmit = (userName) => {
    Application.showGame(userName);
  };

  mainContainer.appendChild(header.element);
  mainContainer.appendChild(rules.element);
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
