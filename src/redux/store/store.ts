import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { fieldsPersistConfig } from '../persistConfig';
import fieldsReducer from '../slices/supportSlice';

// Combine reducers and apply persistReducer to fields slice
const rootReducer = combineReducers({
  fields: persistReducer(fieldsPersistConfig, fieldsReducer),
});

// Configure the store with middleware setup for redux-persist
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions for serialization checks
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Setup persistor linked to the store
export const persistor = persistStore(store);

// Export store as default
export default store;

// Types for RootState and AppDispatch for usage in the app
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
