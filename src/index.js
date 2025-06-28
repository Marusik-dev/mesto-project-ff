import './pages/index.css' ;
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLikeCard } from './scripts/card.js';
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js'


const cardContainer = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const formAddNewCard = document.querySelector('.popup_type_new-card .popup__form');
const popupFullImageContainer = document.querySelector('.popup_type_image');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const descriptionInput = document.querySelector('.popup__input_type_description');
const popupFullImage = popupFullImageContainer.querySelector('.popup__image');
const popupImageNameCaption = popupFullImageContainer.querySelector('.popup__caption');

function handleCardImage(card) {
    openPopup(popupFullImageContainer)
    popupFullImage.src = card.link;
    popupFullImage.alt = card.name;
    popupImageNameCaption.textContent = card.name;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardItem = {
      name: cardNameInput.value.trim(),
      link: cardLinkInput.value.trim()
    };
    const cardElement = createCard(cardItem, deleteCard, handleLikeCard, handleCardImage);
    cardContainer.prepend(cardElement);
    closePopup(popupAddNewCard);
    clearForm(formAddNewCard);
}

function clearForm(form) {
        form.reset();
}

function fillFormFileds(targetInput, sourceData) {   
    targetInput.value = sourceData.textContent.trim();
}

function handleFrofileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value.trim();
    profileDescription.textContent = descriptionInput.value.trim();
    closePopup(popupProfile);
}

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, handleLikeCard, handleCardImage);
    cardContainer.append(cardElement);
 });

buttonOpenPopupProfile.addEventListener('click', function (evt) {
    openPopup(popupProfile);
    fillFormFileds(nameInput, profileTitle);
    fillFormFileds(descriptionInput, profileDescription);
});

buttonOpenPopupAddNewCard.addEventListener('click', function (evt) {
    openPopup(popupAddNewCard);
}); 

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        const popup = this.closest('.popup');
        const form = popup.querySelector('.popup__form');
        closePopup(popup);
    });
});

popupProfile.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupProfile);
});

popupAddNewCard.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupAddNewCard);
});

popupFullImageContainer.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupFullImageContainer);
});

formProfile.addEventListener('submit', handleFrofileFormSubmit);

formAddNewCard.addEventListener('submit', handleCardFormSubmit);