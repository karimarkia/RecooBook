import { ADD_BOOK,CLEAR_BOOK, GET_BOOK } from '../types'
import axios from 'axios'

export const addBook = book => async (dispatch) => {
  const response = await axios.post('/api/books/book', book)

  dispatch({
    type: ADD_BOOK,
    payload: response.data
  })
}
export const clearBook = book => async (dispatch) => {

  dispatch({
    type: CLEAR_BOOK,
    payload: null
  })
}

export const getBook = id =>async dispatch => {
  const response = await axios.get(`/api/books/book?id=${id}`)
  dispatch({
    type:GET_BOOK,
    payload:response.data
  })
}