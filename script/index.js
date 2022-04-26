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
const cardImage = document.querySelector('.cards__image');
const titlePhotoPopup = popupPhoto.querySelector('.popup__name');
const imagePhotoPopup = popupPhoto.querySelector('.popup__image');
const templateCard = document.querySelector('#cards-item');
const cardsContainer = document.querySelector('.cards');

//Копирование карточки из шаблона
function cloneCard(name, link) {
  const cardItem = templateCard.content.cloneNode(true);
  const cardImage = cardItem.querySelector('.cards__image');
  const cardName = cardItem.querySelector('.cards__name');
  const cardLike = cardItem.querySelector('.cards__like');
  const cardDelete = cardItem.querySelector('.cards__delete');

  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  //Функция лайка карточек
  function handleLikeCard(event) {
    event.target.classList.toggle('cards__like_active');
  }

  //Функция удаления карточки
  function deleteCard() {
    cardDelete.closest('.cards__item').remove();
  }

  //Обработчик клика на изображении карточки
  cardImage.addEventListener('click', function (evt) {
    titlePhotoPopup.textContent = evt.target.alt;
    imagePhotoPopup.src = evt.target.src;
    imagePhotoPopup.alt = evt.target.alt;
    openPopup(popupPhoto);
  });

  //Обработчик клика на кнопке лайк
  cardLike.addEventListener('click', handleLikeCard);

  //Обработчик клика на кнопке удаления карточки
  cardDelete.addEventListener('click', deleteCard);

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
  popup.classList.add('popup_opened');
}

//Подгрузка в поля формы значений из профиля
function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  
  openPopup(popupProfile);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  titleInput.value = '';
  linkInput.value = '';
}

//Обработчики кликов, связанных  с редактированием профиля
formElementsPopupProfile.addEventListener('submit', submitFormProfileHandler);
profileEditButton.addEventListener('click', () => {
  openPopupProfile();
});
popupProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

//Обработчики кликов, связанных  с добавлением новой карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddPhoto);
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAddPhoto);
});
formElementsPopupAdd.addEventListener('submit', submitFormAddHandler);

//Обработчик клика на кнопке закрытия попапа с просмотром фото
popupPhotoCloseButton.addEventListener('click', () => {
  closePopup(popupPhoto);
});

function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;

  openPopup(popupProfile);
}
