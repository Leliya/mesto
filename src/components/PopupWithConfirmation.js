import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListenersSubmit(handleAddFormSubmit) {
    this._popupForm.removeEventListener('submit', this.handleAddFormSubmit);
    this.handleAddFormSubmit = handleAddFormSubmit;
    this._popupForm.addEventListener('submit', this.handleAddFormSubmit);
  }
}
