const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__container');
const popupSaveButton = popup.querySelector('.popup__button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const activityInput = formElement.querySelector('.popup__input_type_activity');
const nameProfile = document.querySelector('.profile__name');
const activityProfile = document.querySelector('.profile__activity');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  activityInput.textContent = activityProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;
  closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
