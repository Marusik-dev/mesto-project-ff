import { fetchLikeCard, fetchUnlikeCard } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, openDeleteCallback, likeCallback, imageCallback, current_user_id) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikes = cardElement.querySelector('.card__like-number');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => imageCallback(card));
    cardLikes.textContent = card.likes.length;

    const isLiked = card.likes.some(like => like._id === current_user_id);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (current_user_id === card.owner._id) {
        deleteButton.addEventListener('click', () => {
            openDeleteCallback(cardElement, card._id);
        });
    } else {
        deleteButton.style.display = 'none';
    }

    likeButton.addEventListener('click', () => {
        likeCallback(likeButton, card._id, cardLikes);
    });
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function handleLikeCard(likeButton, cardId, likesCounterElement) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        fetchUnlikeCard(cardId)
        .then((res) => {
            likesCounterElement.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    } else {
        fetchLikeCard(cardId)
        .then((res) => {
            likesCounterElement.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
    }
}

export { createCard, deleteCard, handleLikeCard }; 