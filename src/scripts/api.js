const token = '82ad33b1-627a-4794-8bca-a281fc48356a';
const server = 'https://nomoreparties.co/v1/wff-cohort-42'

function fetchUserData() {
    return fetch(server + '/users/me', {
        headers: {
            authorization: token
        }
    })
    .then((res) => {
      if (res.ok) {
            return res.json();
      }
      return Promise.reject(res.status);
    })    
}

function fetchCards() {
    return fetch(server + '/cards', {
        headers: {
            authorization: token
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })    
}

function fetchProfile(nameValue, aboutValue) {
    return fetch(server + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            about: aboutValue
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

function fetchCard(nameValue, linkValue) {
    return fetch(server + '/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            link: linkValue
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

function fetchDeleteCard(cardId) {
    return fetch(server + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

function fetchLikeCard(cardId) {
    return fetch(server + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

function fetchUnlikeCard(cardId) {
    return fetch(server + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

function fetchUpdateAvatar(link) {
    return fetch(server + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
      }
        return Promise.reject(res.status);
    })
}

export { fetchUserData, fetchCards, fetchProfile, fetchCard, fetchDeleteCard, fetchLikeCard, fetchUnlikeCard, fetchUpdateAvatar }; 