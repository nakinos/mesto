export default class Card {
  constructor({ data: { name, link, likes, owner, _id, userId }, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes || [];
    this._owner = owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._isLiked = this._likes.some(like => like._id === this._userId);
    this.updateLikes = this.updateLikes.bind(this);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');
    this._likeButtonElement = this._element.querySelector('.place__like-button');
    this._deleteButtonElement = this._element.querySelector('.place__delete-button');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__like-count').textContent = this._likes.length;

    if (this._isLiked) {
      this._likeButtonElement.classList.add('place__like-button_active');
    }

    if (this._owner._id !== this._userId) {
      this._deleteButtonElement.classList.add('place__delete-button_disabled');
      this._deleteButtonElement.disabled = true;
    }

    return this._element;
  }

  updateLikes({ likes }) {
    this._likes = likes;
    this._isLiked = this._likes.some(like => like._id === this._userId);
    this._element.querySelector('.place__like-count').textContent = this._likes.length;
    if (this._isLiked) {
      this._likeButtonElement.classList.add('place__like-button_active');
    } else {
      this._likeButtonElement.classList.remove('place__like-button_active');
    }
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
    this._cardImage.addEventListener('click', () => this._handleCardClick(this));
    this._deleteButtonElement.addEventListener('click', () => this._handleDeleteIconClick(this));
    this._likeButtonElement.addEventListener('click', () => this._handleLikeClick(this));
  }
}
