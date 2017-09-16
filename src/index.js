import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import reducers from "./modules/index";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import moment from "moment";

import firebase from "./firebase";
import epics from "./modules/epics";

import { fetchStudentsAction, fetchClassesAction, fetchTasksAction } from "./modules/school/school.actions";
import { fetchDatesAction, fetchWeeksAction } from "./modules/calendar/calendar.actions";

import "./main.css";

const logger = createLogger();
const middleware = [thunkMiddleware, logger, createEpicMiddleware(epics)];

// Pages
import LayoutDefault from "./views/layouts/index";
import Signin from "./modules/account/components/signin.connector";
import Toaster from "./modules/display/components/toaster.connector";
import Preview from "./modules/school/components/preview.connector";
import Students from "./views/pages/Students";
import Calendar from "./views/pages/Calendar";
import Home from "./views/pages/Home";
import Tasks from "./views/pages/Tasks";

moment.locale("fr");

let store = createStore(
	reducers,
	compose(
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	),
	applyMiddleware(...middleware)
);

const tabCollections = [{
	ref: firebase.database().ref("2017-2018/classes"),
	action: fetchClassesAction,
}, {
	ref: firebase.database().ref("2017-2018/dates"),
	action: fetchDatesAction,
}, {
	ref: firebase.database().ref("2017-2018/students"),
	action: fetchStudentsAction,
}, {
	ref: firebase.database().ref("2017-2018/tasks"),
	action: fetchTasksAction,
}, {
	ref: firebase.database().ref("2017-2018/weeks"),
	action: fetchWeeksAction,
}];

tabCollections.forEach(collection => {
	collection.ref.on("value", function(snapshot) {
		store.dispatch(collection.action(snapshot.val() ? Object.values(snapshot.val()) : []));
	});
});


const Main = () =>
	<main>
		<Toaster />
		<Route path="/" component={LayoutDefault} />
		<Route path="/" exact={true} component={Home} />
		<Route path="/login" component={Signin} />
		<Route path="/eleves/:id?" component={Students} />
		<Route path="/preview" component={Preview} />
		<Route path="/calendrier" component={Calendar} />
		<Route path="/taches" component={Tasks} />
	</main>;

const App = () =>
	<Provider store={store}>
		<Main />
	</Provider>;

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
