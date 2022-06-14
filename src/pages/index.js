import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section';

import {
  profileEditButton,
  profileAddButton,
  nameInput,
  activityInput,
  formValidators,
  initialCards,
  objValid,
} from '../utils/constants.js';

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formItem) => {
    const validator = new FormValidator(config, formItem);
    const formName = formItem.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const popupImage = new PopupWithImage('.popup_type_photo');

const cardElement = ({ title, link }) => {
  const card = new Card(
    {
      title,
      link,
    },
    '#cards-item',
    () => {
      popupImage.open(title, link);
    }
  );
  return card.generate({ title, link });
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardNew = cardElement(item);
      cardList.addItem(cardNew);
    },
  },
  '.cards'
);

const popupAddPhoto = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleAddFormSubmit: (data) => {
    cardList.addItem(cardElement(data));
    popupAddPhoto.close();
  },
});

const userInfo = new UserInfo({
  name: '.profile__name',
  activity: '.profile__activity',
});

const inputValue = ({ userName, userActivity }) => {
  nameInput.value = userName;
  activityInput.value = userActivity;
};

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleAddFormSubmit: (user) => {
    userInfo.setUserInfo(user);
    popupProfile.close();
  },
});

cardList.renderItems();

enableValidation(objValid);

popupImage.setEventListeners();

popupProfile.setEventListeners();

popupAddPhoto.setEventListeners();

profileEditButton.addEventListener('click', () => {
  formValidators['profile'].resetValidation();
  popupProfile.open();
  inputValue(userInfo.getUserInfo());
});

profileAddButton.addEventListener('click', () => {
  formValidators['addPhoto'].resetValidation();
  popupAddPhoto.open();
});
