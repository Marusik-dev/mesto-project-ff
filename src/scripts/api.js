const token = '82ad33b1-627a-4794-8bca-a281fc48356a';
const server = 'https://nomoreparties.co/v1/wff-cohort-42';
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '82ad33b1-627a-4794-8bca-a281fc48356a',
    "Content-Type": "application/json"
  },
};

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

function fetchUserData() {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers
    })
    .then(getResponseData)
}

function fetchCards() {
    return fetch(config.baseUrl + '/cards', {
        headers: config.headers
    })
    .then(getResponseData) 
}

function fetchProfile(nameValue, aboutValue) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            about: aboutValue
        })
    })
    .then(getResponseData)
}

function fetchCard(nameValue, linkValue) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            link: linkValue
        })
    })
    .then(getResponseData)
}

function fetchDeleteCard(cardId) {
    return fetch(config.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(getResponseData)
}

function fetchLikeCard(cardId) {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    })
    .then(getResponseData)
}

function fetchUnlikeCard(cardId) {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(getResponseData)
}

function fetchUpdateAvatar(link) {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(getResponseData)
}

export { fetchUserData, fetchCards, fetchProfile, fetchCard, fetchDeleteCard, fetchLikeCard, fetchUnlikeCard, fetchUpdateAvatar }; 