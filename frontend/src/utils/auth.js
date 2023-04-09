import { BASE_URL } from './utils';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

export const register = (password, email) => {
  return request(
    '/signup', 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    }
  )
}

export const authorize = (password, email) => {
  return request(
    '/signin', 
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    }
  )
};

export const logout = () => {
  return request(
    '/users',
    {
      method: "DELETE",
      credentials: "include",
    }
  )
};

export const checkToken = () => {

  return request(
    '/users/me', 
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      } 
    }
  )
};