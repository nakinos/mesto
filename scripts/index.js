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

const placesList = document.querySelector('.places__list');
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__job');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileFormElement = document.forms.editProfile;
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_job');

const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceFormElement = document.forms.addPlace;
const placeNameInput = addPlaceFormElement.querySelector('.popup__input_type_place-name');
const urlInput = addPlaceFormElement.querySelector('.popup__input_type_image-url');

const imagePopup = document.querySelector('.popup_type_show-image');
const imageElement = imagePopup.querySelector('.popup__image');
const imageDescElement = imagePopup.querySelector('.popup__image-description');

const togglePopup = popup => popup.classList.toggle('popup_opened');

const closePopup = popup => {
  document.removeEventListener('keydown', handleEsc);
  togglePopup(popup);
};

const handleEsc = evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const createCard = (name, link) => {
  const cardTemplate = document.querySelector('#place-template').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.place__title').textContent = name;

  cardElement.querySelector('.place__delete-button').addEventListener('click', event =>
    event.target.closest('.place').remove());

  cardElement.querySelector('.place__like-button').addEventListener('click', event =>
    event.target.classList.toggle('place__like-button_active'));

  cardImage.addEventListener('click', event => {
    document.addEventListener('keydown', handleEsc);
    imageElement.src = event.target.src;
    imageElement.alt = event.target.alt;
    imageDescElement.textContent = event.target.alt;
    togglePopup(imagePopup);
  });

  return cardElement;
};

const addPlace = (name, link) => {
  const placeElement = createCard(name, link);
  placesList.prepend(placeElement);
};

initialCards.forEach(item => addPlace(item.name, item.link));

editProfileButton.addEventListener('click', () => {
  document.addEventListener('keydown', handleEsc);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  const inputList = Array.from(editProfilePopup.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = editProfilePopup.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    checkInputValidity(editProfilePopup, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);

  togglePopup(editProfilePopup);
});
editProfileFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(editProfilePopup);
});

addPlaceButton.addEventListener('click', () => {
  document.addEventListener('keydown', handleEsc);

  const inputList = Array.from(addPlacePopup.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = addPlacePopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  togglePopup(addPlacePopup);
});
addPlaceFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  addPlace(placeNameInput.value, urlInput.value);
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
