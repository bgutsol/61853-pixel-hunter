import {changeView} from '../util';
import getGreeting from './greeting';
import HeaderView from './header-view';

const MAX_LIVES = 3;

const getLivesMods = (lives) => {
  const emptyLives = new Array(MAX_LIVES - lives).fill(`empty`);
  const fullLives = new Array(lives).fill(`full`);
  return [...emptyLives, ...fullLives];
};

export default (state) => {
  let header;

  if (state) {
    const {time, lives} = state;
    const livesMods = getLivesMods(lives);
    header = new HeaderView(time, livesMods);
  } else {
    header = new HeaderView();
  }

  header.onBtnBackClick = () => {
    changeView(getGreeting());
  };

  return header.element;
};
