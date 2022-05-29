export const objValid = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  formButton: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputInvalidClass: 'popup__input-invalid',
  errorClass: 'popup__input-error',
};

export class FormValidator {
  constructor(obj, form) {
    this._formElement = obj.formElement;
    this._inputElement = obj.inputElement;
    this._formButton = obj.formButton;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputInvalidClass = obj.inputInvalidClass;
    this._errorClass = obj.errorClass;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', () => {
      this._form.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputElement)
    );
    this._disableButton(inputList);
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem);
        this._disableButton(inputList);
      });
    });
  }

  _isValid(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(inputs) {
    if (this._hasInvalidInput(inputs)) {
      this._form
        .querySelector(this._formButton)
        .classList.add(this._inactiveButtonClass);
      this._form.querySelector(this._formButton).setAttribute('disabled', true);
    } else {
      this._form.querySelector(this._formButton).removeAttribute('disabled');
      this._form
        .querySelector(this._formButton)
        .classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputInvalidClass);
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-input-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputInvalidClass);
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-input-error`
    );
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}
