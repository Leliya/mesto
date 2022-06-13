import './index.css';
import { initialCards, Card } from '../components/Card.js';
import { objValid, FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section';

const popupProfile = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const nameInput = popupProfile.querySelector('.popup__input_type_name');
const activityInput = popupProfile.querySelector('.popup__input_type_activity');

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formItem) => {
    const validator = new FormValidator(config, formItem);
    const formName = formItem.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(objValid);

const cardDefault = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card({
        data: item,
        cardSelector: '#cards-item',
        handleCardClick: (name, link) => {
          const popupImage = new PopupWithImage('.popup_type_photo');
          popupImage.setEventListeners();
          popupImage.open(name, link);
        },
      });

      cardDefault.addItem(cardElement.generate());
    },
  },
  '.cards'
);

cardDefault.renderItems();

const popupAddPhoto = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleAddFormSubmit: (data) => {
    const cardNew = new Section({}, '.cards');
    const cardElement = new Card({
      data,
      cardSelector: '#cards-item',
      handleCardClick: (name, link) => {
        const popupImage = new PopupWithImage('.popup_type_photo');
        popupImage.setEventListeners();
        popupImage.open(name, link);
      },
    });

    cardNew.addItem(cardElement.generate());
    popupAddPhoto.close();
  },
});

const userInfo = new UserInfo({
  name: '.profile__name',
  activity: '.profile__activity',
});

profileEditButton.addEventListener('click', () => {
  formValidators['profile'].resetValidation();

  const inputValue = ({ name, activity }) => {
    nameInput.value = name;
    activityInput.value = activity;
  };

  const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleAddFormSubmit: (user) => {
      userInfo.setUserInfo(user);
      popupProfile.close();
      inputValue(userInfo.getUserInfo());
    },
  });
  popupProfile.setEventListeners();
  popupProfile.open();
  inputValue(userInfo.getUserInfo());
});

profileAddButton.addEventListener('click', () => {
  formValidators['addPhoto'].resetValidation();
  popupAddPhoto.open();
});
popupAddPhoto.setEventListeners();
