const htmlToTemplate = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
};

export { htmlToTemplate };
