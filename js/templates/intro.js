import {createElement, changeView} from '../util';
import IntroView from './intro-view';
import getGreeting from './greeting';

export default () => {
  const mainContainer = createElement();
  const intro = new IntroView();

  intro.onBtnContinueClick = () => {
    changeView(getGreeting());
  };

  mainContainer.appendChild(intro.element);

  return mainContainer;
};
