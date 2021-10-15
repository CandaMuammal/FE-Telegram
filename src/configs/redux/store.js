import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
    rootReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['rootReducer']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default function configureStore() {
    const store = createStore(
        persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
    )

    const persistor = persistStore(store)

    return { store, persistor }
}



// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(thunk))
//     )

// export default store