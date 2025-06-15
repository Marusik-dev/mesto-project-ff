import {closePopup} from './popups.js'

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCallback, likeCallback, imageCallback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCallback);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => imageCallback(card));
    
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function handleCardImage(card) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    imagePopup.classList.add('popup_is-opened');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardNameInput = document.querySelector('.popup__input_type_card-name');
    const cardLinkInput = document.querySelector('.popup__input_type_url');
    const cardItem = {
      name: cardNameInput.value.trim(),
      link: cardLinkInput.value.trim()
    };
    const cardElement = createCard(cardItem, deleteCard, handleLikeCard, handleCardImage);
    const cardContainer = document.querySelector('.places__list');
    cardContainer.prepend(cardElement);
    const popup = document.querySelector('.popup_type_new-card');
    closePopup(popup);
}

export { initialCards, createCard, deleteCard, handleLikeCard, handleCardImage, handleCardFormSubmit }; 