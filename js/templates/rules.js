import {createElement, changeView} from '../util';
import getHeader from './header';
import getFooter from './footer';
import getGame from './game';

export default () => {
  const html = `
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

  const template = createElement(html);

  const btnSubmit = template.querySelector(`.rules__button`);

  template.querySelector(`.rules__input`).addEventListener(`input`, function (e) {
    const input = e.target;
    btnSubmit.disabled = !input.value;
  });
  template.querySelector(`.rules__form`).addEventListener(`submit`, (e) => {
    e.preventDefault();

    changeView(getGame());
  });

  template.insertBefore(getHeader(), template.firstChild);
  template.appendChild(getFooter());

  return template;
};
