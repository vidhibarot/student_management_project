import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import reducers from '../reducers/index';

const persistConfig = {
  key: 'userData',
  storage,
};

export const persistedReducer = (reducers) => persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer(reducers)
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;
export const persistor = persistStore(store);
export { store, dispatch, useSelector, useDispatch };
