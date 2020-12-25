import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import booksReducer from './reducers/booksReducer'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const rootReducers = combineReducers({
  booksReducer,
//   devTools
})





const Store = createStore(rootReducers, applyMiddleware(thunk))

export default Store
