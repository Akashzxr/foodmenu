import storage from 'redux-persist/lib/storage'; 
import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './slices/branchSlice';
import cartReducer from './slices/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, branchReducer);
const persistedCartReducer = persistReducer(persistConfig,cartReducer);
export const store = configureStore({
  reducer: {
    branch: persistedReducer,
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);
// Define types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


