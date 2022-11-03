import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JSOG from 'jsog';
import {reducer} from '../reducer';

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [JSOGTransform],
};

const rootReducer = (state, action) => reducer(state, action);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = createStore(
  persistedReducer,
  applyMiddleware(promise, thunk),
);

export const persistor = persistStore(configureStore);
