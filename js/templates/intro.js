import {createElement, changeView} from '../util';
import getGreeting from './greeting';

export default () => {
  const html = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

  const template = createElement(html);

  template.querySelector(`.intro__asterisk`).addEventListener(`click`, (e) => {
    e.preventDefault();

    changeView(getGreeting());
  });

  return template;
};
