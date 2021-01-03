import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from '../types'

// const initialState = {
//     user : "karim"
//     }

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        auth: action.payload.auth,
        userData: action.payload.userData,
      }
    case AUTH_USER:
      return {
        ...state,
        auth: action.payload.auth ? action.payload.auth : false,
        userData: action.payload.userData ? action.payload.userData : false,
      }
    case LOGOUT_USER:
      return {
        ...state,
        auth: false,
        userData: false,
      }

    default:
      return state
  }
}

export default usersReducer
