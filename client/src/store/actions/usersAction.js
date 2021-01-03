import axios from 'axios'
import { AUTH_USER, LOGIN_USER, LOGOUT_USER } from '../types'

export const loginUser = ({ email, password }) => async (dispatch) => {
  const response = await axios.post('/api/users/login', { email, password })

  dispatch({
    type: LOGIN_USER,
    payload: response.data,
  })
}

export const authUser = () => async (dispatch) => {
  const response = await axios.get('/api/users/auth')

  dispatch({
    type: AUTH_USER,
    payload: response.data,
  })
}


export const logoutUser = () => async (dispatch) => {
  const response = await axios.get('/api/users/logout')
  document.cookie = "Name=auth; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/logout;";
  dispatch({
    type:LOGOUT_USER,
    payload: response.data
  })
}