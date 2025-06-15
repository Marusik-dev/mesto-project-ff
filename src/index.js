import './pages/index.css' ;
import { initialCards, createCard, deleteCard, handleLikeCard, handleCardImage, handleCardFormSubmit } from './scripts/cards.js';
import { openPopup, closePopup, closePopupByOverlay } from './scripts/popups.js'
import { fillFormFileds, handleFrofileFormSubmit, profileTitle, nameInput, profileDescription, descriptionInput } from './scripts/profile.js'

//выести карточки на страницу
const cardContainer = document.querySelector('.places__list');

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, handleLikeCard, handleCardImage);
    cardContainer.append(cardElement);
 });


const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileForm = document.querySelector('.popup_type_edit .popup__form');
const cardForm = document.querySelector('.popup_type_new-card .popup__form');

profileEditButton.addEventListener('click', function (evt) {
    openPopup(popupProfile);
    fillFormFileds(nameInput, profileTitle);
    fillFormFileds(descriptionInput, profileDescription);
});

profileAddButton.addEventListener('click', function (evt) {
    openPopup(popupNewCard);
}); 

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        const popup = this.closest('.popup');
        closePopup(popup);
    });
});

popupProfile.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupProfile);
});

popupNewCard.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupNewCard);
});

profileForm.addEventListener('submit', handleFrofileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);