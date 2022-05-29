const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupPhoto = document.querySelector('.popup_type_photo');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');
const forms = document.querySelectorAll('.popup__form');
const formElementsPopupProfile =
  popupProfile.querySelector('.popup__container');
const formElementsPopupAdd = popupAddPhoto.querySelector('.popup__container');

const nameInput = formElementsPopupProfile.querySelector(
  '.popup__input_type_name'
);
const activityInput = formElementsPopupProfile.querySelector(
  '.popup__input_type_activity'
);
const titleInput = formElementsPopupAdd.querySelector(
  '.popup__input_type_title'
);
const linkInput = formElementsPopupAdd.querySelector('.popup__input_type_link');

const nameProfile = document.querySelector('.profile__name');
const activityProfile = document.querySelector('.profile__activity');

const cardsContainer = document.querySelector('.cards');

import { initialCards, Card } from './Card.js';
import { objValid, FormValidator } from './FormValidator.js';

function prependCard(card) {
  cardsContainer.prepend(card);
}

const openPopupPhoto = () => {
  openPopup(popupPhoto);
};

function makeCard(title, image) {
  const card = new Card(
    title,
    image,
    '#cards-item',
    handleCardClick
  );

  const cardElement = card.generate();

  prependCard(cardElement);
}

initialCards.forEach(function (item) {
  const title = item.name;
  const image = item.link;

  makeCard(title, image);
});

forms.forEach((form) => {
  const validate = new FormValidator(objValid, form);
  validate.enableValidation();
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;

  openPopup(popupProfile);
}

function closePopupOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  });
}

function handleCardClick(name, link) {
  const popupPhotoName = popupPhoto.querySelector('.popup__name');
  const popupPhotoImage = popupPhoto.querySelector('.popup__image');
  
  popupPhotoName.textContent = name;
  popupPhotoImage.src = link;
  popupPhotoImage.alt = name;

  openPopup(popupPhoto);
}


function submitFormProfileHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;

  closePopup(popupProfile);
}

function submitFormAddHandler(evt) {
  evt.preventDefault();

  const title = titleInput.value;
  const image = linkInput.value;

  makeCard(title, image);

  closePopup(popupAddPhoto);

  evt.target.reset();
}

const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => closePopupOverlay(popup));

profileEditButton.addEventListener('click', () => {
  openPopupProfile();
});
profileAddButton.addEventListener('click', () => {
  const submitButtonPopup = popupAddPhoto.querySelector('.popup__button');
  submitButtonPopup.classList.add('popup__button_disabled');
  submitButtonPopup.setAttribute('disabled', true);
  openPopup(popupAddPhoto);
});

popupPhotoCloseButton.addEventListener('click', () => {
  closePopup(popupPhoto);
});

formElementsPopupProfile.addEventListener('submit', submitFormProfileHandler);
formElementsPopupAdd.addEventListener('submit', submitFormAddHandler);
