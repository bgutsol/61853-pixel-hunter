import AbstractView from '../abstract-view';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
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
  }

  get btnSubmit() {
    return this.element.querySelector(`.rules__button`);
  }

  onSubmit() {}

  onInput(value) {
    this.btnSubmit.disabled = !value;
  }

  bind() {
    const input = this.element.querySelector(`.rules__input`);
    const form = this.element.querySelector(`.rules__form`);

    input.addEventListener(`input`, (e) => {
      const targetInput = e.target;
      const value = targetInput.value;
      this.onInput(value);
    });
    form.addEventListener(`submit`, (e) => {
      e.preventDefault();
      const value = input.value;
      this.onSubmit(value);
    });
  }
}
