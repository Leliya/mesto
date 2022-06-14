export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _cloneCard() {
    const tempCard = document.querySelector(this._cardSelector).content;
    const templateCard = tempCard.querySelector('.cards__item').cloneNode(true);

    return templateCard;
  }

  generate() {
    this._cardItem = this._cloneCard();
    this._cardImage = this._cardItem.querySelector('.cards__image');
    this._cardImage.src = this._link;
    this._cardItem.querySelector('.cards__name').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLike = this._cardItem.querySelector('.cards__like');
    this._cardDelete = this._cardItem.querySelector('.cards__delete');

    this._setEventListeners();

    return this._cardItem;
  }

  _handleLikeCard() {
    this._cardLike.classList.toggle('cards__like_active');
  }

  _deleteCard() {
    this._cardItem.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardDelete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
