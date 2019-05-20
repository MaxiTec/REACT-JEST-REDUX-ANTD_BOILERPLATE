import axios from 'axios';
import { actionTypes } from '../constants/actions-types';

// EXAMPLE: Load elements from service
const API_URL = 'https://reqres.in/api/users?page=2';
const actionLoadElements = () => dispatch => axios
  .get(API_URL)
  .then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.LOAD_FROM_SERVICE,
      elements: response.data.data,
    });
  })
  .catch(error => console.log('ERROR -> GET ELEMENTS FROM SERVICE', error));

export default actionLoadElements;
