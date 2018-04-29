import {createElement} from '../util';
import FooterView from './footer-view';
import GreetingView from './greeting-view';
import Application from '../application';


export default () => {
  const mainContainer = createElement();
  const greeting = new GreetingView();
  const footer = new FooterView();

  greeting.onBtnContinueClick = () => {
    Application.showRules();
  };

  mainContainer.appendChild(greeting.element);
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
