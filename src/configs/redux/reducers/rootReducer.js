import {combineReducers} from 'redux'
import userReducer from './userReducers'
// import orderReducer from './orderReducer'
// import productReducer from './productReducer.js'

const rootReducer = combineReducers({
  user: userReducer,

})

export default rootReducer