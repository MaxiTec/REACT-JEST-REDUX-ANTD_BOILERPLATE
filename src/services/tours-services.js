import Axios from 'axios';
import { API_URL } from '../conf/configuration';
import { history } from '../store/history';
import store from '../store/store';
import { userActions } from '../actions/user-actions';
const API_URL = 'https://5cec507b77d47900143b930b.mockapi.io/vcm/';
function getAll() {
  return Axios.post(`${API_URL}tours`, { email: username, password })
    .then(response => response)
    .catch(error => handleResponse(error));
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    // debe concatenar el header
    headers: authHeader(),
  };
  return fetch(`${apiUrl}users?page=2`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user, token) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(error) {
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch(userActions.logout());
      history.push('/');
    }
    return Promise.reject(error.response.data);
  }
  if (error.request) {
    return Promise.reject(error.request);
  }
  return Promise.reject(error.message);
  //   console.log('Error', error.message);
}
export const userService = {
  getAll,
  getById,
  update,
};
