// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
     deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });
    
    cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.style.display = 'none';
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    addCard(item, deleteCard);
});
