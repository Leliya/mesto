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
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputElement)
    );
    this._submitButton = this._form.querySelector(this._formButton);
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._isValid(inputItem);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputItem) {
    this._errorElement = this._form.querySelector(
      `.${inputItem.id}-input-error`
    );
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputInvalidClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputInvalidClass);
    this._errorElement = this._form.querySelector(
      `.${inputElement.id}-input-error`
    );
    this._errorElement.classList.remove(this._errorClass);

    this._errorElement.textContent = '';
  }
}
