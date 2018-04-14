const createElement = (html = ``) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

const main = document.querySelector(`main.central`);

const changeView = (template) => {
  main.innerHTML = ``;
  main.appendChild(template);
};

export {createElement, changeView};
