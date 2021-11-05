import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this._popup.querySelector('.popup__image');
    this._imgDescElement = this._popup.querySelector('.popup__image-description');
  }

  open({ name, link }) {
    this._imgElement.src = link;
    this._imgElement.alt = name;
    this._imgDescElement.textContent = name;
    super.open();
  }
}
