import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValues = {};
    this._popupInputs.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }

  _handlePopupFormSubmit(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => this._handlePopupFormSubmit(evt));
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
