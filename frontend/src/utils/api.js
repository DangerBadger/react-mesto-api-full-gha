import { apiSettings } from './utils';

class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  };


  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request(
      `/users/me`,
      {
        method: "GET",
        credentials: "include",
      })
  };
  
  getInitialCards() {
    return this._request(
      `/cards`,
      {
        method: "GET",
        credentials: "include",
      })
  };

  setUserInfo({name, about}) {
    return this._request(
      `/users/me`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          about
        })
      })
  }

  addNewCard({name, link}) {
    return this._request(
      `/cards`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          link
        })
      })
  }

  deleteCard(cardId) {
    return this._request(
      `/cards/${cardId}`,
      {
        method: "DELETE",
        credentials: "include",
      })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(
      `/cards/${cardId}/likes`,
      {
        method: isLiked ? "DELETE" : "PUT",
        credentials: "include",
      })
  }

  setUserAvatar({avatar}) {
    return this._request(
      `/users/me/avatar`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar
        })
      })
  };
}

const api = new Api(apiSettings);

export default api;