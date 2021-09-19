let body = document.querySelector('.body');
let name = body.querySelector('.profile__name');
let job = body.querySelector('.profile__job');
let popup = body.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

let editProfileButton = body.querySelector('.profile__edit-button');
let closeFormButton = popup.querySelector('.popup__close-button');

function onEditButtonClick() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  popup.classList.add('popup_opened');
}

function onCloseFormButtonClick() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  onCloseFormButtonClick();
}

editProfileButton.addEventListener('click', onEditButtonClick);
closeFormButton.addEventListener('click', onCloseFormButtonClick);
formElement.addEventListener('submit', formSubmitHandler);
