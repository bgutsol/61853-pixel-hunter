const createElement = (html = ``) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(this._element);
    }
    return this._element;
  }

  render() {
    return createElement(this.template);
  }

  bind() {
    // bind handlers
  }

}


