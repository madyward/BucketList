//IMPORT COMPONENTS & DECLARE VARIABLES
import React from "react";
import ReactDom from "react-dom";
import reduxThunk from "redux-thunk";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import App from "./components/app";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import RequireAuth from "./components/auth/require_auth";
import ListItem from "./components/list/new-list-item";
import ListShow from "./components/list/list-items";
import reducers from "./reducers";


var createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDom.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
			<Route path="signin" component={Signin} />
			<Route path="signout" component={Signout} />
			<Route path="signup" component={Signup} />
			<Route path="newitem" component={RequireAuth(ListItem)} />
			<Route path="items" component={RequireAuth(ListShow)} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector(".container")
);