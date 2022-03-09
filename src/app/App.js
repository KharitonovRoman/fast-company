import React from "react";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/login/:type?" component={Login} />
				<Route path="/users/:userId?/:edit?" component={Users} />
				<Redirect to="/" />
			</Switch>
		</>
	);
}

export default App;
