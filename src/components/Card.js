export default class Card {
  constructor(
    data,
    ownerId,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    handleLikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._userId = data.owner._id;
    this._cardId = data._id;
    this._ownerId = ownerId;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._hideImage = this._hideImage.bind(this);
  }

  _cloneCard() {
    const tempCard = document.querySelector(this._cardSelector).content;
    const templateCard = tempCard.querySelector('.cards__item').cloneNode(true);

    return templateCard;
  }

  _hideImage() {
    this._cardImage.style.visibility = 'hidden';
  }

  generate() {
    this._cardItem = this._cloneCard();
    this._cardImage = this._cardItem.querySelector('.cards__image');

    this._cardImage.src = this._link;
    this._cardImage.onerror = this._hideImage;
    this._cardItem.querySelector('.cards__name').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLike = this._cardItem.querySelector('.cards__like');
    this._cardDelete = this._cardItem.querySelector('.cards__delete');

    if (this._userId !== this._ownerId) {
      this._cardDelete.classList.add('card__delete_hidden');
    } else {
      this._cardDelete.classList.remove('card__delete_hidden');
    }

    this._counterLikes = this._cardItem.querySelector('.cards__like-counter');
    if (this._likes.some((item) => item._id === this._ownerId)) {
      this._changeLikeButton();
    }
    this._counterLikes.textContent = this._likes.length;

    this._setEventListeners();

    this._cardItem.id = this._cardId;

    return this._cardItem;
  }

  changeCounterLike(array) {
    this._changeLikeButton();
    this._counterLikes.textContent = array.length;
  }
  _changeLikeButton() {
    this._cardLike.classList.toggle('cards__like_active');
  }

  deleteCard(id) {
    document.getByElementId(id).remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeCard(this._cardId, this._cardLike);
    });

    this._cardDelete.addEventListener('click', () => {
      this._handleCardDelete(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
