import React from "react";
import { Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";
import SignInPage from "./Pages/SignInPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./Pages/ProfilePage";
import useUser, { UserProvider } from "./hooks/useUser";
import axios from "axios";
import PageVisibility from "react-page-visibility";

export default function App() {
  const { user, token } = useUser();

	function handleVisibility(visibility) {
    console.log(user || token);
		if (user || token) {
			axios
				.patch("/api/users/status", visibility, { headers: { "x-auth-token": token } })
				.then(({ data }) => console.log(data));
		}
	}

	return (
		<UserProvider>
			<PageVisibility onChange={handleVisibility}>
				<Router>
					<HomePage path="/" />
					<ProfilePage path="/profile" />
					<SignUpPage path="/sign-up" />
					<Feed path="/feed" />
					<SignInPage path="/signin" />
					<FriendsPage path="/friends" />
				</Router>
			</PageVisibility>
		</UserProvider>
	);
}
