import {API_URL} from '../conf/configuration';
import Axios from 'axios';
import history from '../store/history'
// import { authHeader } from '../_helpers';
// import {history} from '../store/history'
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
};

function login(username, password) {
    console.log(username,password)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:username, password })
    };
    //cambiar todos a Axios
    return Axios.post(`${API_URL}login`,{ email:username, password }).then(function (response) {
        return response
      })
      .catch(function (error) {
        return handleResponse(error)
      });
}

function logout() {
    // remove user from local storage to log user out
    console.log('me deslogueo')
    localStorage.removeItem('persist:login');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        //debe concatenar el header
        headers: authHeader()
    };
    return fetch(`${apiUrl}users?page=2`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}
function handleResponse(error) {
    console.log(error.response.status)
    if (error.response) {
        if (error.response.status === 400) {
            console.log('LLLEGOO')
            logout();
            history.push('/')
        }
        // throw new Error(error.response.data.toString());
        return Promise.reject(error.response.data);
    } else if (error.request) {
        return Promise.reject(error.request);
    } else {
        console.log('Error', error.message);
    }
}