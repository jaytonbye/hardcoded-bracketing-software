import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

import PasswordResetLandingPage from "./PasswordResetLandingPage";
import ShowAllLogins from "./ShowAllLogins";
import LoggedIn from "./LoggedIn";

const App = (props: AppProps) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/createAccount">
            <CreateAccount />
          </Route>
          <Route exact path="/homepage">
            <LoggedIn />
          </Route>
          <Route path="/passwordResetLandingPage/:encryptedIdInUrl">
            <PasswordResetLandingPage />
          </Route>
          <Route path="/ShowAllLoggins">
            <ShowAllLogins />
          </Route>

          <Route path="*">
            <h1>404 not found error, you probably went to the wrong page...</h1>
            <a href="/WrestlersView">Go back to the homepage!</a>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

interface AppProps {}

export default App;
