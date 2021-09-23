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
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileFormElement = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_job');
const closeEditProfileButton = editProfilePopup.querySelector('.popup__close-button');

const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlaceFormElement = addPlacePopup.querySelector('.popup__form');
const placeNameInput = addPlaceFormElement.querySelector('.popup__input_type_place-name');
const urlInput = addPlaceFormElement.querySelector('.popup__input_type_image-url');
const closeAddPlaceButton = addPlacePopup.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.popup_type_show-image');
const imageElement = imagePopup.querySelector('.popup__image');
const imageDescElement = imagePopup.querySelector('.popup__image-description');
const closeImageButton = imagePopup.querySelector('.popup__close-button');

const togglePopup = popup => popup.classList.toggle('popup_opened');

const addPlace = (name, link) => {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  placeImage.src = link;
  placeImage.alt = name;
  placeElement.querySelector('.place__title').textContent = name;

  placeElement.querySelector('.place__delete-button').addEventListener('click', event =>
    event.target.closest('.place').remove());

  placeElement.querySelector('.place__like-button').addEventListener('click', event =>
    event.target.classList.toggle('place__like-button_active'));

  placeImage.addEventListener('click', event => {
    imageElement.src = event.target.src;
    imageElement.alt = event.target.alt;
    imageDescElement.textContent = event.target.alt;
    togglePopup(imagePopup);
  });

  placesList.prepend(placeElement);
};

initialCards.forEach(item => addPlace(item.name, item.link));

editProfileButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  togglePopup(editProfilePopup)
});
editProfileFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup(editProfilePopup);
});
closeEditProfileButton.addEventListener('click', () => togglePopup(editProfilePopup));

addPlaceButton.addEventListener('click', () => togglePopup(addPlacePopup));
addPlaceFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  addPlace(placeNameInput.value, urlInput.value);
  togglePopup(addPlacePopup);
});
closeAddPlaceButton.addEventListener('click', () => togglePopup(addPlacePopup));

closeImageButton.addEventListener('click', () => togglePopup(imagePopup));
