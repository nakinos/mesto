import { openPopup } from './utils.js';

export class Card {
  _popup = document.querySelector('.popup_type_show-image');
  _popupImage = this._popup.querySelector('.popup__image');
  _popupImageDesc = this._popup.querySelector('.popup__image-description');

  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._cardImage.addEventListener('click', evt => {
      this._popupImage.src = evt.target.src;
      this._popupImage.alt = evt.target.alt;
      this._popupImageDesc.textContent = evt.target.alt;
      openPopup(this._popup);
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

  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }

}
