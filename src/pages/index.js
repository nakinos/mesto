import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import Section from '../components/Section.js';
import {
  addPlaceButton,
  addPlaceFormElement,
  cardTemplateSelector,
  editProfileButton,
  editProfileFormElement,
  initialCards,
  jobInput,
  nameInput,
  validationConfig
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo';

const userInfo = new UserInfo({ nameSelector: '.profile__name', bioSelector: '.profile__job' });

const imagePopup = new PopupWithImage('.popup_type_show-image');
imagePopup.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, () => imagePopup.open(item));
    section.addItem(card.generateCard());
  }
}, '.places__list');
section.renderItems();

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = bio;

  editProfileFormValidator.clearInputError();
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm('.popup_type_add-place', (inputValues) => {
  const newCard = new Card(inputValues, cardTemplateSelector, () => imagePopup.open(inputValues));
  section.addItem(newCard.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();

addPlaceButton.addEventListener('click', () => {
  addPlaceFormValidator.clearInputError();
  addPlaceFormValidator.toggleButtonState();
  addCardPopup.open();
});

const editProfileFormValidator = new FormValidator(validationConfig, editProfileFormElement);
editProfileFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceFormElement);
addPlaceFormValidator.enableValidation();
