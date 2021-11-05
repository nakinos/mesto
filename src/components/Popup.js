export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    this.close();
  }

  _handleOverviewClick(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this._handleCloseButtonClick());
    this._popup.addEventListener('click', evt => this._handleOverviewClick(evt));
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}
