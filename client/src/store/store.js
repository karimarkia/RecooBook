import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import booksReducer from './reducers/booksReducer'
import usersReducer from './reducers/usersReducer'

const rootReducers = combineReducers({
  booksReducer,
  usersReducer,
})

const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default Store
