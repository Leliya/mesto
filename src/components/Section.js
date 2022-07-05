export default class Section {
  // constructor({ items, renderer }, listSelector) {
  constructor({renderer}, listSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._listCards = document.querySelector(listSelector);
  }

  addItem(element) {
    this._listCards.prepend(element);
  }

  renderItems(renderedItems, ownerId) {
    renderedItems.forEach((item) => {
      this._renderer(item, ownerId);
    });
  }
}
