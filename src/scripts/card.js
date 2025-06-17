const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCallback, likeCallback, imageCallback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    
    cardElement.querySelector('.card__title').textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => imageCallback(card));

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCallback);
    
    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, handleLikeCard }; 