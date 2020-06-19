import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import getStore from "./getStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistLocalStore } = getStore();
ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistLocalStore}>
			<App />
		</PersistGate>
	</Provider>
	, document.getElementById("root"));
registerServiceWorker();