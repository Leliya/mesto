import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleAddFormSubmit }) {
    super(popupSelector);
    this._handleAddFormSubmit = handleAddFormSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  open(){
    super.open();
    this.loaded(false);
  }

  loaded(isTrue){
    this._popupbutton = this._popupSelector.querySelector('.popup__button')
    if(isTrue){
    this._popupbutton.textContent ='Сохранение...';} else{
      this._popupbutton.textContent ='Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this.loaded(true);
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
