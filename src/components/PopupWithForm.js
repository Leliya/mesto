import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleAddFormSubmit }) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleAddFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
