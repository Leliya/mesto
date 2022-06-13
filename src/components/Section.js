export default class Section {
  constructor({ items, renderer }, listSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._listSelector = document.querySelector(listSelector);
  }

  addItem(element) {
    this._listSelector.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
