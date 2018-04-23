import {changeView, createElement} from '../util';
import FooterView from './footer-view';
import GreetingView from './greeting-view';
import getRules from './rules';


export default () => {
  const mainContainer = createElement();
  const greeting = new GreetingView();
  const footer = new FooterView();

  greeting.onBtnContinueClick = () => {
    changeView(getRules());
  };

  mainContainer.appendChild(greeting.element);
  mainContainer.appendChild(footer.element);

  return mainContainer;
};
