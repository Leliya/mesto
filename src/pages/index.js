import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupCardDelete from '../components/PopupCardDelete.js';
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
  avatarUnload,
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

const popupCardDelete = new PopupCardDelete('.popup_type_delete', {
  handleAddFormSubmit: (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        document.getElementById(cardId).remove();
        popupCardDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

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
      popupCardDelete.open(_id);
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

const cardList = (initialCards, ownerId) =>
  new Section(
    {
      items: initialCards,
      renderer: (item) => {
        // const cardListNew = cardList(initialCards)
        cardList({}, ownerId).addItem(cardElement(item, ownerId));
      },
    },
    '.cards'
  );

const popupAddPhoto = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleAddFormSubmit: (data) => {
    api
      .postNewCard(data)
      .then((data) => {
        cardList([]).addItem(cardElement(data, data.owner._id));
        popupAddPhoto.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
    api
      .setUserInfo(user)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleAddFormSubmit: (avatar) => {
    api
      .setAvatar(avatar)
      .then((data) => {
        userInfo.setAvatar(data);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(err);
        userInfo.setAvatar(avatarUnload);
        popupAvatarEdit.close();
      });
  },
});

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user);
    api
      .getInitialCards()
      .then((data) => {
        data = data.reverse();
        const cardListDefault = cardList(data, user._id);
        cardListDefault.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(objValid);

popupImage.setEventListeners();

popupProfile.setEventListeners();

popupAddPhoto.setEventListeners();

popupCardDelete.setEventListeners();

popupAvatarEdit.setEventListeners();

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
