import React from "react";
import { Redirect, Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";
import SignInPage from "./Pages/SignInPage";
import FriendsPage from "./pages/FriendsPage";
import useUser, { UserProvider } from "./hooks/useUser";

export default function App() {
	return (
		<UserProvider>
			<Router>
				<HomePage path="/" />
				<SignInPage path="/signin" />
				<SignUpPage path="/sign-up" />

				<ProtectedRoute path="/feed" component={<Feed path="/feed" />} />
				<ProtectedRoute path="/friends" component={<FriendsPage path="/friends" />} />
				<ProtectedRoute path="/feed" component={<Feed path="/feed" />} />
			</Router>
		</UserProvider>
	);
}

function ProtectedRoute(props) {
	const user = useUser();
	const Component = props.component;

	console.log(user);

	return user ? <Component /> : <Redirect from={props.path} to="/signin" />;
}
