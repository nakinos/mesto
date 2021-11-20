import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import {
  addCardButton,
  addCardFormElement,
  cardTemplateSelector,
  editAvatarButton,
  editProfileButton,
  editProfileFormElement,
  jobInput,
  nameInput,
  updateAvatarFormElement,
  validationConfig
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'c12bf14b-6b87-475d-91b9-c3e4fe46ec1c',
    'Content-Type': 'application/json'
  }
});

function handleCardClick() {
  imagePopup.open({ name: this._name, link: this._link});
}

function handleLikeClick(card) {
  if (this._isLiked) {
    api.unlikeCard(card)
      .then(res => {
        this.updateLikes(res);
      })
      .catch(err => console.log(err));
  } else {
    api.likeCard(card)
      .then(res => {
        this.updateLikes(res);
      })
      .catch(err => console.log(err));
  }
}

function handleDeleteIconClick(card, cardElement) {
  submitPopup.setSubmitCallback(card => {
    api.deleteCard(card)
      .then(() => {
        cardElement.remove();
        submitPopup.close();
      })
      .catch(err => console.log(err));
   });
  submitPopup.open(card);
};

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__job', avatarSelector: '.profile__avatar' });

const section = new Section({
  renderer: data => {
    const card = new Card({ data: { ...data, userId: userInfo.id }, handleCardClick, handleLikeClick, handleDeleteIconClick },
      cardTemplateSelector);
    return card.generateCard();
  }
}, '.places__list');

const imagePopup = new PopupWithImage('.popup_type_show-image');
const submitPopup = new PopupWithSubmit('.popup_type_submit');
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  editProfilePopup.renderLoading(true);
  api.editProfileInfo(inputValues)
    .then(res => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => editProfilePopup.renderLoading(false));
});
const updateAvatarPopup = new PopupWithForm('.popup_type_update-avatar', (inputValues) => {
  updateAvatarPopup.renderLoading(true);
  api.editProfileAvatar(inputValues)
    .then(res => {
      userInfo.setUserInfo(res);
      updateAvatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => updateAvatarPopup.renderLoading(false));
});
const addCardPopup = new PopupWithForm('.popup_type_add-place', (inputValues) => {
  addCardPopup.renderLoading(true);
  api.addCard(inputValues)
    .then(res => {
      section.addItem(res);
      addCardPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => addCardPopup.renderLoading(false));
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
submitPopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});
editAvatarButton.addEventListener('click', () => {
  updateAvatarFormValidator.resetValidation();
  updateAvatarPopup.open();
});
addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

const editProfileFormValidator = new FormValidator(validationConfig, editProfileFormElement);
const updateAvatarFormValidator = new FormValidator(validationConfig, updateAvatarFormElement);
const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

editProfileFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
addCardFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    userInfo.setUserInfo(res[0]);
    section.renderItems(res[1]);
  })
  .catch(err => console.log(err));
