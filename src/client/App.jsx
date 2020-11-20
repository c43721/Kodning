import React from "react";
import { Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import SignInPage from "./Pages/SignInPage";

export default function App() {
  return (
    <Router>
      <HomePage path="/" />
      <TestPage path="/test" />
      <SignInPage path="sign__in__page" />
    </Router>
  );
}
