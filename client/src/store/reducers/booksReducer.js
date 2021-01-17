// const initialState = {
//   add
// }

import { ADD_BOOK, CLEAR_BOOK } from '../types'

const booksReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        add: action.payload,
      }
    case CLEAR_BOOK:
      return {
        ...state,
        add: action.payload,
      }

    default:
      return state
  }
}

export default booksReducer
