import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

const reducer = combineReducers({
    rootReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store