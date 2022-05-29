export const initialCards = [
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

export class Card {
  constructor(name, link, cardSelector, openPopup, popup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._popup = popup;
    this._openPopup = openPopup;
  }

  _cloneCard() {
    const tempCard = document.querySelector(this._cardSelector).content;
    const templateCard = tempCard.querySelector('.cards__item').cloneNode(true);

    return templateCard;
  }

  generate() {
    this._cardItem = this._cloneCard();
    this._cardItem.querySelector('.cards__image').src = this._link;
    this._cardItem.querySelector('.cards__name').textContent = this._name;
    this._cardItem.querySelector('.cards__image').alt = this._name;

    this._setEventListeners();

    return this._cardItem;
  }

  _handleLikeCard() {
    this._cardItem
      .querySelector('.cards__like')
      .classList.toggle('cards__like_active');
  }

  _deleteCard() {
    this._cardItem
      .querySelector('.cards__delete')
      .closest('.cards__item')
      .remove();
  }

  _setEventListeners() {
    this._cardItem
      .querySelector('.cards__like')
      .addEventListener('click', () => {
        this._handleLikeCard();
      });

    this._cardItem
      .querySelector('.cards__delete')
      .addEventListener('click', () => {
        this._deleteCard();
      });

    this._cardItem
      .querySelector('.cards__image')
      .addEventListener('click', () => {
        debugger;
        this._popup.querySelector('.popup__name').textContent = this._name;
        this._popup.querySelector('.popup__image').src = this._link;
        this._popup.querySelector('.popup__image').alt = this._name;
        this._openPopup(this._popup);
      });
  }
}
