import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducers"
import { rootSagas } from "./rootSagas"

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = sagaMiddleware

const store = createStore(persistedReducer, applyMiddleware(middleware));
const persist = persistStore(store);

// Run the saga
sagaMiddleware.run(rootSagas);

export { persist };
export default store;