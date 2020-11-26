import React from "react";
import { Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";
import SignInPage from "./Pages/SignInPage";
import FriendsPage from "./pages/FriendsPage";
import { UserProvider } from "./hooks/useUser";

export default function App() {
	const handleSubmit = e => {
		e.preventDefault();
		console.log("clicked");
	};

	return (
		<UserProvider>
			<Router>
				<HomePage path="/" />
				<TestPage path="/test" />
				<SignUpPage path="/sign-up" />
				<Feed path="/feed" onFormSubmit={handleSubmit} />
				<SignInPage path="/signin" />
				<FriendsPage path="/friends" />
			</Router>
		</UserProvider>
	);
}
