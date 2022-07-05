import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

import {
  profileEditButton,
  profileAddButton,
  profileAvatarEdit,
  nameInput,
  activityInput,
  formValidators,
  objValid,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '3d4f8c04-3648-430b-a07d-7834b6267814',
    'Content-Type': 'application/json',
  },
});

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

const cardElement = ({ name, link, owner, _id, likes }, ownerId) => {
  const card = new Card(
    {
      name,
      link,
      owner,
      _id,
      likes,
    },
    ownerId,
    '#cards-item',
    () => {
      popupImage.open(name, link);
    },
    (_id) => {
      const handleAddFormSubmit = (evt) => {
        evt.preventDefault();
        api
          .deleteCard(_id)
          .then(() => {
            card.deleteCard(_id);
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      popupWithConfirmation.open();
      popupWithConfirmation.setEventListenersSubmit(handleAddFormSubmit);
    },
    (_id, cardlike) => {
      if (!cardlike.classList.contains('cards__like_active')) {
        api
          .addLikeCard(_id)
          .then((res) => card.changeCounterLike(res.likes))
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLikeCard(_id)
          .then((res) => card.changeCounterLike(res.likes))
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.generate({ name, link });
};

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete');

const cardList = new Section(
  {
    renderer: (item, ownerId) => {
      cardList.addItem(cardElement(item, ownerId));
    },
  },
  '.cards'
);

const popupAddPhoto = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleAddFormSubmit: (data) => {
    popupAddPhoto.loaded(true);
    api
      .postNewCard(data)
      .then((data) => {
        cardList.addItem(cardElement(data, data.owner._id));
        popupAddPhoto.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAddPhoto.loaded(false));
  },
});

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__activity',
  avatar: '.profile__avatar',
});

const inputValue = ({ userName, userActivity }) => {
  nameInput.value = userName;
  activityInput.value = userActivity;
};

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleAddFormSubmit: (user) => {
    popupProfile.loaded(true);
    api
      .setUserInfo(user)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupProfile.loaded(false));
  },
});

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleAddFormSubmit: (avatar) => {
    popupAvatarEdit.loaded(true);
    api
      .setAvatar(avatar)
      .then((data) => {
        userInfo.setAvatar(data);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatarEdit.loaded(false));
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);

    cards = cards.reverse();
    cardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(objValid);

popupImage.setEventListeners();

popupProfile.setEventListeners();

popupAddPhoto.setEventListeners();

popupAvatarEdit.setEventListeners();

popupWithConfirmation.setEventListeners();

profileEditButton.addEventListener('click', () => {
  formValidators['profile'].resetValidation();
  popupProfile.open();
  inputValue(userInfo.getUserInfo());
});

profileAddButton.addEventListener('click', () => {
  formValidators['addPhoto'].resetValidation();
  popupAddPhoto.open();
});

profileAvatarEdit.addEventListener('click', () => {
  formValidators['avatar'].resetValidation();
  popupAvatarEdit.open();
});
