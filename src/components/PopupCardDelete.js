import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, { handleAddFormSubmit }) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
  }

  loaded(isTrue) {
    this._popupbutton = this._popupSelector.querySelector('.popup__button');
    if (isTrue) {
      this._popupbutton.textContent = 'Сохранение...';
    } else {
      this._popupbutton.textContent = 'Сохранить';
    }
  }

  open(cardId) {
    super.open();
    this._popupForm.addEventListener(
      'submit',
      (evt) => {
        this.loaded(true);
        evt.preventDefault();
        this._handleAddFormSubmit(cardId);
      },
      { once: true }
    );
  }

  close() {
    super.close();
  }
}
