import React from "react";
import { Router } from "@reach/router";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";

export default function App() {
  return (
    <Router>
      <HomePage path="/" />
      <TestPage path="/test" />
      <SignUpPage path="/sign-up" />
      <Feed path="/feed" />
    </Router>
  );
}
