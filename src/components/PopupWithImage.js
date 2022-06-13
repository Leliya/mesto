import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const popupPhotoName = this._popupSelector.querySelector('.popup__name');
    const popupPhotoImage = this._popupSelector.querySelector('.popup__image');
    popupPhotoName.textContent = name;
    popupPhotoImage.src = link;
    popupPhotoImage.alt = name;
    super.open();
  }
}
