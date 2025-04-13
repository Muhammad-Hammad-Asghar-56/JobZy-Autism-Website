import userReducer from "./reducers/userSlice"; // Use default import
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

// Combine reducers (hotspots should be inside here)
const rootReducer = combineReducers({
    user: userReducer,

});
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
});

// Persistor for persisting the store
export const persistor = persistStore(store);

export default store;