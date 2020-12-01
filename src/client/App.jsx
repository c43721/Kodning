import React from "react";
import { Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";
import SignInPage from "./Pages/SignInPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./Pages/ProfilePage";
import { UserProvider } from "./hooks/useUser";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <HomePage path="/" />
        <ProfilePage path="/profile" />
        <SignUpPage path="/sign-up" />
        <Feed path="/feed" />
        <SignInPage path="/signin" />
        <FriendsPage path="/friends" />
      </Router>
    </UserProvider>
  );
}
