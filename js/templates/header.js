import {changeView} from '../util';
import getGreeting from './greeting';
import HeaderView from './header-view';

export default (state) => {
  const header = new HeaderView(state);

  header.onBtnBackClick = () => {
    changeView(getGreeting());
  };

  return header.element;
};
