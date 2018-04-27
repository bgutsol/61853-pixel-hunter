import AbstractView from '../../abstract-view';
import StatsListView from '../stats-list-view';
import fitImgSize from '../helpers/fit-image-size';

const drawOptionFormInputs = (number) => {
  return `<label class="game__answer game__answer--photo">
        <input name="question${number}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${number}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
};

const imageLoadHandler = (e) => {
  const image = e.target;
  const imageSize = {
    width: image.width,
    height: image.height
  };
  const imgParent = image.parentElement;
  const frameSize = {
    width: imgParent.clientWidth,
    height: imgParent.clientHeight
  };
  const fitedImgSize = fitImgSize(frameSize, imageSize);
  image.width = fitedImgSize.width;
  image.height = fitedImgSize.height;
  image.style.display = ``;
};

const getOptionImage = (answer) => {
  const image = new Image();

  image.src = answer.imgSrc;
  image.style.display = `none`;
  image.addEventListener(`load`, imageLoadHandler);
  return image;
};

export default class LevelView extends AbstractView {
  constructor(data, stats = []) {
    super();

    this.data = data;
    this.stats = stats;
    this._contentClass = ``;
    this._hasFormInputs = true;
  }

  get template() {
    const statsList = new StatsListView(this.stats);

    return `
  <div class="game">
    <p class="game__task">${this.data.task}</p>
    ${this.contentHtml}
    <div class="stats">
      ${statsList.template}
    </div>
  </div>`;
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.addOptions();
      this.bind(this._element);
    }
    return this._element;
  }

  addOptions() {
    const wrapperElement = this.element.querySelector(`.game__content`);

    this.data.answers.map((answer, index) => {
      const option = document.createElement(`div`);
      option.className = `game__option`;
      option.setAttribute(`data-index`, index);
      option.appendChild(getOptionImage(answer));

      if (this._hasFormInputs) {
        option.insertAdjacentHTML(`beforeend`, drawOptionFormInputs(index));
      }

      wrapperElement.appendChild(option);
    });
  }

  get contentHtml() {
    return `<form class="game__content ${this._contentClass}"></form>`;
  }
}
