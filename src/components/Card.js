export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.place__delete-button').addEventListener('click', evt => {
      this._handleDeleteClick(evt);
    });

    this._element.querySelector('.place__like-button').addEventListener('click', evt => {
      this._handleLikeClick(evt);
    });
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.place').remove();
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }
}
