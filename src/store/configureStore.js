import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import cardsReducer from '../reducers/cardsReducer'

const store = createStore(cardsReducer, applyMiddleware(thunk/*, logger*/))

export default store
