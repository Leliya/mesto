const dataValid = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  formButton: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputInvalidClass: 'popup__input-invalid',
  errorClass: 'popup__input-error',
};

function enableValidation(obj = {}) {
  const formList = Array.from(document.querySelectorAll(obj.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (evt.key === 'Enter') {
        return false;
      }
    });
    setEventListeners(formElement, obj);
  });
}

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputElement));
  const formButton = formElement.querySelector(obj.formButton);
  disableButton(inputList, formButton, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      disableButton(inputList, formButton, obj);
      inputElement.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter' && hasInvalidInput(inputList)) {
          evt.preventDefault();
          return false;
        }
      });
    });
  });
};

const isValid = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      obj,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(inputList, formButton, obj) {
  if (hasInvalidInput(inputList)) {
    formButton.classList.add(obj.inactiveButtonClass);
  } else {
    formButton.classList.remove(obj.inactiveButtonClass);
  }
}

const showInputError = (formElement, inputElement, obj, errorMessage) => {
  inputElement.classList.add(obj.inputInvalidClass);
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  inputElement.classList.remove(obj.inputInvalidClass);
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

enableValidation(dataValid);
