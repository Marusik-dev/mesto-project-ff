import {closePopup} from './popups.js'

const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const descriptionInput = document.querySelector('.popup__input_type_description');

function fillFormFileds(targetInput, sourceData) {   
    targetInput.value = sourceData.textContent.trim();
}

function handleFrofileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value.trim();
    profileDescription.textContent = descriptionInput.value.trim();
    const popup = document.querySelector('.popup_type_edit');
    closePopup(popup);
}

export { fillFormFileds, handleFrofileFormSubmit, profileTitle, nameInput, profileDescription, descriptionInput }; 