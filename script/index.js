const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupPhoto = document.querySelector('.popup_type_photo');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupProfileCloseButton = popupProfile.querySelector(
  '.popup__close-button'
);
const popupAddCloseButton = popupAddPhoto.querySelector('.popup__close-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');

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
const cardImage = document.querySelector('.cards__image');

const titlePhotoPopup = popupPhoto.querySelector('.popup__name');
const imagePhotoPopup = popupPhoto.querySelector('.popup__image');

const templateCard = document.querySelector('#cards-item');

function cloneCard(name, link) {
  const cardItem = templateCard.content.cloneNode(true);
  const cardImage = cardItem.querySelector('.cards__image');
  const cardName = cardItem.querySelector('.cards__name');
  const cardLike = cardItem.querySelector('.cards__like');
  const cardDelete = cardItem.querySelector('.cards__delete');

  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  function handleLikeCard(event) {
    event.target.classList.toggle('cards__like_active');
  }

  function deleteCard() {
    cardDelete.closest('.cards__item').remove();
  }

  cardImage.addEventListener('click', function (evt) {
    titlePhotoPopup.textContent = evt.target.alt;
    imagePhotoPopup.src = evt.target.src;
    imagePhotoPopup.alt = evt.target.alt;
    openPopup(popupPhoto);
  });

  cardLike.addEventListener('click', handleLikeCard);

  cardDelete.addEventListener('click', deleteCard);

  return cardItem;
}

function appendCard(card) {
  cardsContainer.prepend(card);
}

initialCards.forEach(function (item) {
  const title = item.name;
  const image = item.link;

  appendCard(cloneCard(title, image));
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

  appendCard(cloneCard(title, image));

  closePopup(popupAddPhoto);

  evt.target.reset();
}

const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => closePopupOverlay(popup));

formElementsPopupProfile.addEventListener('submit', submitFormProfileHandler);
profileEditButton.addEventListener('click', () => {
  openPopupProfile();
});

profileAddButton.addEventListener('click', () => {
  const submitButtonPopup = popupAddPhoto.querySelector('.popup__button');
  submitButtonPopup.classList.add('popup__button_disabled');
  submitButtonPopup.setAttribute('disabled', true)
  openPopup(popupAddPhoto);
});

popupPhotoCloseButton.addEventListener('click', () => {
  closePopup(popupPhoto);
});

formElementsPopupAdd.addEventListener('submit', submitFormAddHandler);
