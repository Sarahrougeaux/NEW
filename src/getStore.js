import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import controllers from "./controlers/index";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default () => {
	let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
	sagaMiddleware.run(controllers);
	let persistLocalStore = persistStore(store);
	return { store, persistLocalStore };
};
