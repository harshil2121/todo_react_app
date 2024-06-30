import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"],
};

const middlewares = [thunk]; // Remove routeMiddleware
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createReducer());
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };
