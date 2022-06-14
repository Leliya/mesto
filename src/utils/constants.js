export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);
export const profileAddButton = document.querySelector('.profile__add-button');

export const nameInput = document.querySelector('.popup__input_type_name');
export const activityInput = document.querySelector(
  '.popup__input_type_activity'
);

export const formValidators = {};

export const initialCards = [
  {
    title: 'Самара',
    link: 'https://images.unsplash.com/photo-1646580060894-10b1e2d9ac7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    title: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1596014531797-b3f67a07a493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    title: 'Калининград',
    link: 'https://images.pexels.com/photos/8321728/pexels-photo-8321728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    title: 'Карелия',
    link: 'https://images.pexels.com/photos/8632549/pexels-photo-8632549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },

  {
    title: 'Алтай',
    link: 'https://images.pexels.com/photos/7300311/pexels-photo-7300311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    title: 'Байкал',
    link: 'https://images.pexels.com/photos/8676972/pexels-photo-8676972.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
];

export const objValid = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  formButton: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputInvalidClass: 'popup__input-invalid',
  errorClass: 'popup__input-error',
};
