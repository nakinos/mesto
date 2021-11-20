export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

export const cardTemplateSelector = '#place-template';
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
export const editProfilePopup = document.querySelector('.popup_type_edit-profile');
export const editProfileFormElement = document.forms.editProfile;
export const editProfileInputList = Array.from(editProfilePopup.querySelectorAll(validationConfig.inputSelector));
export const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
export const jobInput = editProfileFormElement.querySelector('.popup__input_type_job');
export const addCardFormElement = document.forms.addCard;
export const updateAvatarFormElement = document.forms.updateAvatar;
