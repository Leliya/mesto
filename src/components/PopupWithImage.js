import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoName = this._popupSelector.querySelector('.popup__name');
    this._popupPhotoImage = this._popupSelector.querySelector('.popup__image');
  }

  open(name, link) {
    this._popupPhotoName.textContent = name;
    this._popupPhotoImage.src = link;
    this._popupPhotoImage.alt = name;
    super.open();
  }
}
