import "./App.css";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./route-config";
import configureValidations from "./Validations";
import { useEffect, useState } from "react";
import { claim } from "./auth/auth.models";
import AuthenticationContext from "./auth/AuthenticationContext";
import { getClaims } from "./auth/handleJWT";
import configureInterceptor from "./utils/httpInterceptors";
import Footer from "./Footer";

configureValidations();
configureInterceptor();

function App() {
	const [claims, setClaims] = useState<claim[]>([
		{
			name: "email",
			value: "vixxerror4@gmail.com",
		},
		{
			name: "role",
			value: "admin",
		},
	]);

	useEffect(() => {
		setClaims(getClaims());
	}, []);

	function isAdmin() {
		return (
			claims.findIndex(
				(claim) => claim.name === "role" && claim.value === "admin"
			) > -1
		);
	}

	return (
		<BrowserRouter>
			<AuthenticationContext.Provider value={{ claims, update: setClaims }}>
				<Menu />
				<Switch>
					{routes.map((route) => (
						<Route key={route.path} path={route.path} exact={route.exact}>
							{route.isAdmin && !isAdmin() ? (
								<>You are not allowed to see this page</>
							) : (
								<route.component />
							)}
						</Route>
					))}
				</Switch>
				<Footer />
			</AuthenticationContext.Provider>
		</BrowserRouter>
	);
}

export default App;
