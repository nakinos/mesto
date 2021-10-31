const togglePopup = popup => popup.classList.toggle('popup_opened');

const handleEsc = evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

export const openPopup = popup => {
  document.addEventListener('keydown', handleEsc);
  togglePopup(popup);
}

export const closePopup = popup => {
  document.removeEventListener('keydown', handleEsc);
  togglePopup(popup);
};

