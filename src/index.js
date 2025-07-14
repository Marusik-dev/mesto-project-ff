import './pages/index.css' ;
import { createCard, deleteCard, handleLikeCard } from './scripts/card.js';
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'
import { fetchUserData, fetchCards, fetchProfile, fetchCard, fetchDeleteCard, fetchUpdateAvatar } from './scripts/api.js'


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
const profileImage = document.querySelector('.profile__image');
const popupDeleteCard = document.querySelector('.popup_delete_card');
const buttonDeleteCard = document.querySelector('.popup_delete_card .popup__button');
const popupUpdateAvatar = document.querySelector('.popup_update_avatar');
const formChangeAvatar = document.querySelector('.popup_update_avatar .popup__form');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let initialCards = [];
let currentUserId = null;
let cardToDelete = null;


function handleCardImage(card) {
    openPopup(popupFullImageContainer)
    popupFullImage.src = card.link;
    popupFullImage.alt = card.name;
    popupImageNameCaption.textContent = card.name;
}

function openDeletePopup(cardElement, cardId) {
    cardToDelete = { element: cardElement, id: cardId };
    openPopup(popupDeleteCard);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(submitButton, true);

    fetchCard(cardNameInput.value.trim(), cardLinkInput.value.trim())
    .then((res) => {
        const cardElement = createCard(res, openDeletePopup, handleLikeCard, handleCardImage, currentUserId);
        cardContainer.prepend(cardElement);
        closePopup(popupAddNewCard);
        clearForm(formAddNewCard);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
        renderLoading(submitButton, false);
    });
}

function handleChangeAvatarFormSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(submitButton, true);

    const avatarLinkInput = formChangeAvatar.querySelector('.popup__input_type_url');
    const avatarUrl = avatarLinkInput.value.trim();

    fetchUpdateAvatar(avatarUrl)
    .then((res) => {
        profileImage.style.backgroundImage = `url('${res.avatar}')`;
        closePopup(popupUpdateAvatar);
        clearForm(formChangeAvatar);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
        renderLoading(submitButton, false);
    });
}

function clearForm(form) {
        form.reset();
}

function fillFormFileds(targetInput, sourceData) {   
    targetInput.value = sourceData.textContent.trim();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    renderLoading(submitButton, true);

    fetchProfile(nameInput.value.trim(), descriptionInput.value.trim())
    .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(popupProfile);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
        renderLoading(submitButton, false);
    });
}

function deleteSelectedCard(evt) {
    evt.preventDefault();
    if (cardToDelete) {
        fetchDeleteCard(cardToDelete.id)
        .then(() => {
            deleteCard(cardToDelete.element);
            closePopup(popupDeleteCard);
            cardToDelete = null;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
    });
    }
}

function renderLoading(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = 'Сохранить';
    buttonElement.disabled = false;
  }
}

function renderInitialData() {
    Promise.all([fetchUserData(), fetchCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;
        currentUserId = userData._id;

        initialCards = cardsData;
        cardContainer.innerHTML = '';            
        initialCards.forEach((item) => {
            const cardElement = createCard(item, openDeletePopup, handleLikeCard, handleCardImage, currentUserId);
            cardContainer.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`);
    });
}

buttonOpenPopupProfile.addEventListener('click', function (evt) {
    clearForm(formProfile);
    clearValidation(formProfile, validationConfig);
    openPopup(popupProfile);
    fillFormFileds(nameInput, profileTitle);
    fillFormFileds(descriptionInput, profileDescription);
});

buttonOpenPopupAddNewCard.addEventListener('click', function (evt) {
    clearForm(formAddNewCard);
    clearValidation(formAddNewCard, validationConfig);
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

popupUpdateAvatar.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupUpdateAvatar);
});

popupDeleteCard.addEventListener('click', function(evt) {
    closePopupByOverlay(evt, popupDeleteCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formAddNewCard.addEventListener('submit', handleCardFormSubmit);

buttonDeleteCard.addEventListener('click', deleteSelectedCard);

profileImage.addEventListener('click', () => {
  clearForm(formChangeAvatar);
  clearValidation(formChangeAvatar, validationConfig);
  openPopup(popupUpdateAvatar);
});

formChangeAvatar.addEventListener('submit', handleChangeAvatarFormSubmit)

renderInitialData();
enableValidation(validationConfig);