import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {routerMiddleware} from 'connected-react-router';
// @ts-ignore
import {createBrowserHistory} from 'history';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers';
// @ts-ignore
import AsyncStorage from "@callstack/async-storage";

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(
  persistedReducer,
  process.env.NODE_ENV === 'production' ? compose(applyMiddleware(ReduxThunk, routerMiddleware(history))) : composeWithDevTools(applyMiddleware(ReduxThunk, routerMiddleware(history))),
);
const persistor = persistStore(store);

export default store;
export {persistor};
