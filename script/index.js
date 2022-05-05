const popupProfile = document.querySelector(".popup_type_profile");
const popupAddPhoto = document.querySelector(".popup_type_add-photo");
const popupPhoto = document.querySelector(".popup_type_photo");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupProfileCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
const popupAddCloseButton = popupAddPhoto.querySelector(".popup__close-button");
const popupPhotoCloseButton = popupPhoto.querySelector(".popup__close-button");
const formElementsPopupProfile =
  popupProfile.querySelector(".popup__container");
const formElementsPopupAdd = popupAddPhoto.querySelector(".popup__container");

const nameInput = formElementsPopupProfile.querySelector(
  ".popup__input_type_name"
);
const activityInput = formElementsPopupProfile.querySelector(
  ".popup__input_type_activity"
);
const titleInput = formElementsPopupAdd.querySelector(
  ".popup__input_type_title"
);
const linkInput = formElementsPopupAdd.querySelector(".popup__input_type_link");
const nameProfile = document.querySelector(".profile__name");
const activityProfile = document.querySelector(".profile__activity");
const cardImage = document.querySelector(".cards__image");
const titlePhotoPopup = popupPhoto.querySelector(".popup__name");
const imagePhotoPopup = popupPhoto.querySelector(".popup__image");
const templateCard = document.querySelector("#cards-item");
const cardsContainer = document.querySelector(".cards");

function handleLikeCard(evt) {
  if (evt.target.classList.contains("cards__like")) {
    evt.target.classList.toggle("cards__like_active");
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains("cards__delete")) {
    evt.target.closest(".cards__item").remove();
  }
}

function openCardImage(evt) {
  if (evt.target.classList.contains("cards__image")) {
    titlePhotoPopup.textContent = evt.target.alt;
    imagePhotoPopup.src = evt.target.src;
    imagePhotoPopup.alt = evt.target.alt;
    openPopup(popupPhoto);
  }
}

//Копирование карточки из шаблона
function cloneCard(name, link) {
  const cardItem = templateCard.content.cloneNode(true);
  const cardImage = cardItem.querySelector(".cards__image");
  const cardName = cardItem.querySelector(".cards__name");

  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  return cardItem;
}

//Добавление клонированной карточки
function appendCard(card) {
  cardsContainer.prepend(card);
}

//Перебор массива с начальными карточками
initialCards.forEach(function (item) {
  const title = item.name;
  const image = item.link;

  appendCard(cloneCard(title, image));
});

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  const submitButtonPopup = popup.querySelector(".popup__button");
  submitButtonPopup.classList.add("popup__button_disabled");
}

//Подгрузка в поля формы значений из профиля
function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;

  openPopup(popupProfile);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Функция отправки заполненной формы редактирования профиля
function submitFormProfileHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;

  closePopup(popupProfile);
}

//Функция отправки заполненной формы добавления новой карточки
function submitFormAddHandler(evt) {
  evt.preventDefault();

  const title = titleInput.value;
  const image = linkInput.value;

  appendCard(cloneCard(title, image));

  closePopup(popupAddPhoto);

  //Сброс значений полей
  titleInput.value = "";
  linkInput.value = "";
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(`.popup__form`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (evt.key === "Enter") {
        return false;
      }
    });
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const formButton = formElement.querySelector(".popup__button");
  disableButton(inputList, formButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      isValid(formElement, inputElement);
      disableButton(inputList, formButton);
      inputElement.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" && hasInvalidInput(inputList)) {
          evt.preventDefault();
          return false;
        }
      });
    });
  });
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(inputList, formButton) {
  if (hasInvalidInput(inputList)) {
    formButton.classList.add("popup__button_disabled");
  } else {
    formButton.classList.remove("popup__button_disabled");
  }
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add("popup__input-invalid");
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error");
  //formButoon.classList.add("popup__button_disabled");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove("popup__input-invalid");
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  errorElement.classList.remove("popup__input-error");
  errorElement.textContent = "";
};

enableValidation();

//Обработчики кликов, связанных  с редактированием профиля
formElementsPopupProfile.addEventListener("submit", submitFormProfileHandler);
profileEditButton.addEventListener("click", () => {
  openPopupProfile();
});
popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

//Обработчики кликов, связанных  с добавлением новой карточки
profileAddButton.addEventListener("click", () => {
  openPopup(popupAddPhoto);
});
popupAddCloseButton.addEventListener("click", () => {
  closePopup(popupAddPhoto);
});
formElementsPopupAdd.addEventListener("submit", submitFormAddHandler);

//Обработчик клика на кнопке закрытия попапа с просмотром фото
popupPhotoCloseButton.addEventListener("click", () => {
  closePopup(popupPhoto);
});

cardsContainer.addEventListener("click", handleLikeCard);
cardsContainer.addEventListener("click", deleteCard);
cardsContainer.addEventListener("click", openCardImage);
