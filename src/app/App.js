import React from "react";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { Route, Switch } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/users/:userId?" component={Users} />
			</Switch>
		</>
	);
}

export default App;
