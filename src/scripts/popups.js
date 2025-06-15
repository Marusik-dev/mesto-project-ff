function openPopup(popupElement) {
    popupElement.classList.remove('popup_is-animated');
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
}

function handleEscKey(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
  }
}

function clearForm(popupElement) {
    const form = popupElement.querySelector('.popup__form');
    if(form) {
        form.reset();
    }
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.classList.add('popup_is-animated');
    document.removeEventListener('keydown', handleEscKey);
    clearForm(popupElement);
};

function closePopupByOverlay(evt, popElement) {
      if (evt.target === popElement) {
        closePopup(popElement);
      }
}

export { openPopup, closePopup, closePopupByOverlay }; 