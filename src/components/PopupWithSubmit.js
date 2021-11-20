import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._handleSubmitButtonClick = this._handleSubmitButtonClick.bind(this);
  }

  _handleSubmitButtonClick() {
    this._submitCallback(this._cardId);
  }

  setSubmitCallback(callback) {
    this._submitCallback = callback;
  }

  open(card) {
    this._cardId = card;
    this._submitButton.addEventListener('click', this._handleSubmitButtonClick);
    super.open();
  }

  close() {
    super.close();
    this._submitButton.removeEventListener('click', this._handleSubmitButtonClick);
  }
}
