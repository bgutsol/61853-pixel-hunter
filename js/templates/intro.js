import {createElement} from '../util';
import IntroView from './intro-view';
import Application from '../application';

export default () => {
  const mainContainer = createElement();
  const intro = new IntroView();

  intro.onBtnContinueClick = () => {
    Application.showGreeting();
  };

  mainContainer.appendChild(intro.element);

  return mainContainer;
};
