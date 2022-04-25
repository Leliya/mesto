const popups = document.querySelectorAll('.popup');
const popupProfile = popups[0];
const popupAddPhoto = popups[1];
const popupPhoto = popups[2];
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formElements = document.querySelectorAll('.popup__container');
const nameInput = formElements[0].querySelector('.popup__input_type_name');
const activityInput = formElements[0].querySelector(
  '.popup__input_type_activity'
);
const titleInput = formElements[1].querySelector('.popup__input_type_title');
const linkInput = formElements[1].querySelector('.popup__input_type_link');
const nameProfile = document.querySelector('.profile__name');
const activityProfile = document.querySelector('.profile__activity');
const cardsImage = document.querySelector('.cards__image');
const titlePhotoPopup = popupPhoto.querySelector('.popup__name');
const imagePhotoPopup = popupPhoto.querySelector('.popup__image');
const templateCards = document.querySelector('#cards-item');
const cards = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Самара',
    link: 'https://images.unsplash.com/photo-1646580060894-10b1e2d9ac7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1596014531797-b3f67a07a493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    name: 'Калининград',
    link: 'https://images.pexels.com/photos/8321728/pexels-photo-8321728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Карелия',
    link: 'https://images.pexels.com/photos/8632549/pexels-photo-8632549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },

  {
    name: 'Алтай',
    link: 'https://images.pexels.com/photos/7300311/pexels-photo-7300311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    name: 'Байкал',
    link: 'https://images.pexels.com/photos/8676972/pexels-photo-8676972.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
];

//Копирование карточки из шаблона
function cloneCard(name, link) {
  const cardsItem = templateCards.content.cloneNode(true);
  const cardsImage = cardsItem.querySelector('.cards__image');
  const cardsName = cardsItem.querySelector('.cards__name');

  cardsName.textContent = name;
  cardsImage.alt = name;
  cardsImage.src = link;

  //Функция лайка карточек
  function cardsLike() {
    const cardsLike = cardsItem.querySelector('.cards__like');
    cardsLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_active');
    });
  }

  //Функция открытия попапа с просмотром фото
  function openPopupPhoto() {
    popupPhoto.classList.toggle('popup_opened');
  }

  //Обработчик клика на изображении карточки
  cardsImage.addEventListener('click', function (evt) {
    titlePhotoPopup.textContent = evt.target.alt;
    imagePhotoPopup.src = evt.target.src;
    imagePhotoPopup.alt = evt.target.alt;
    openPopupPhoto();
  });

  //Функция удаления карточки
  function cardDelete() {
    const cardsDelete = cardsItem.querySelector('.cards__delete');
    cardsDelete.addEventListener('click', function () {
      cardsDelete.closest('.cards__item').remove();
    });
  }

  cardsLike();

  cardDelete();

  cards.prepend(cardsItem);
}

//Перебор массива с начальными карточками
initialCards.forEach(function (item) {
  const title = item.name;
  const image = item.link;

  cloneCard(title, image);
});

//Функция закрытия попапа с просмотром фото
function closePopupPhoto() {
  popupPhoto.classList.remove('popup_opened');
}

//Функция открытия попапа редактирования профиля
function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  activityInput.value = activityProfile.textContent;
  popupProfile.classList.add('popup_opened');
}

//Функция закрытия попапа редактирования профиля
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

//Функция открытия попапа добавления фото
function openPopupAddPhoto() {
  titleInput.value = titleInput.ariaPlaceholder;
  linkInput.value = linkInput.ariaPlaceholder;
  popupAddPhoto.classList.add('popup_opened');
}

//Функция закрытия попапа добавления фото
function closePopupAddPhoto() {
  popupAddPhoto.classList.remove('popup_opened');
}

//Функция отправки заполненной формы редактирования профиля
function formSubmitProfileHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  activityProfile.textContent = activityInput.value;

  closePopupProfile();
}

//Функция отправки заполненной формы добавления новой карточки
function formSubmitAddHandler(evt) {
  evt.preventDefault();

  const title = titleInput.value;
  const image = linkInput.value;

  cloneCard(title, image);

  closePopupAddPhoto();
}

//Обработчики кликов, связанных  с редактированием профиля
formElements[0].addEventListener('submit', formSubmitProfileHandler);
profileEditButton.addEventListener('click', openPopupProfile);
popupCloseButtons[0].addEventListener('click', closePopupProfile);

//Обработчики кликов, связанных  с добавлением новой карточки
profileAddButton.addEventListener('click', openPopupAddPhoto);
popupCloseButtons[1].addEventListener('click', closePopupAddPhoto);
formElements[1].addEventListener('submit', formSubmitAddHandler);

//Обработчик клика на кнопке закрытия попапа с просмотром фото
popupCloseButtons[2].addEventListener('click', closePopupPhoto);
