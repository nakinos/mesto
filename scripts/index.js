import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const placesList = document.querySelector('.places__list');
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__job');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileFormElement = document.forms.editProfile;
const editProfileInputList = Array.from(editProfilePopup.querySelectorAll(validationConfig.inputSelector));
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_job');

const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceFormElement = document.forms.addPlace;
const placeNameInput = addPlaceFormElement.querySelector('.popup__input_type_place-name');
const urlInput = addPlaceFormElement.querySelector('.popup__input_type_image-url');

const editProfileFormValidator = new FormValidator(validationConfig, editProfileFormElement);
editProfileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceFormElement);
addPlaceFormValidator.enableValidation();

const addPlace = (data) => {
  const card = new Card(data, '#place-template');
  const cardElement = card.generateCard();
  placesList.prepend(cardElement);
};

initialCards.forEach(item => addPlace(item));

editProfileButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  editProfileInputList.forEach(inputElement => {
    editProfileFormValidator.checkInputValidity(inputElement);
  });
  editProfileFormValidator.toggleButtonState();

  openPopup(editProfilePopup);
});
editProfileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(editProfilePopup);
});

addPlaceButton.addEventListener('click', () => {
  addPlaceFormValidator.toggleButtonState();
  openPopup(addPlacePopup);
});
addPlaceFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  addPlace({ name: placeNameInput.value, link: urlInput.value });
  closePopup(addPlacePopup);
  addPlaceFormElement.reset();
});

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) closePopup(popup);
  });
});
