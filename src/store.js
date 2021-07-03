import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

/* Configurações dos reducers mantidos */
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

/* Reducer com configurações */
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };