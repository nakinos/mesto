import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    const popupInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    popupInputs.forEach(input => inputValues[input.name] = input.value);
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
