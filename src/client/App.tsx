import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import PasswordResetLandingPage from "./PasswordResetLandingPage";
import ShowAllLogins from "./ShowAllLogins";
import LoggedIn from "./LoggedIn";
import EventsPage from "./EventsPage";
import Admin from "./Admin";
import EventAdminPage from "./EventAdminPage";
import SingleMatPage from "./SingleMatPage";
import DivisionAdminPage from "./DivisionAdminPage";
import BullShitComononet from "./BullShitComononet";
import BracketView from "./BracketVeiw";
import UpdateAllByes from "./UpdateAllByes";
import PracticingWithFlexboxToDisplayTheBrackets from "./PracticingWithFlexboxToDisplayTheBrackets";
import SingleBoutForDisplayBracket from "./SingleBoutForDisplayBracket";
import DisplayBracket from "./DisplayBracket";

const App = (props: AppProps) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/createAccount">
            <CreateAccount />
          </Route>

          <Route exact path="/bracketView">
            <BracketView />
          </Route>
          <Route exact path="/events/:eventID/mat/:matNumber">
            <SingleMatPage />
          </Route>
          <Route exact path="/blah">
            <PracticingWithFlexboxToDisplayTheBrackets />
          </Route>
          <Route exact path="/blah2">
            <SingleBoutForDisplayBracket />
          </Route>
          <Route exact path="/blah3">
            <BullShitComononet />
          </Route>
          <Route exact path="/blah4">
            <UpdateAllByes />
          </Route>
          <Route exact path="/homepage">
            <LoggedIn />
          </Route>
          <Route exact path="/events/:event">
            <EventsPage />
          </Route>
          <Route exact path="/eventAdmin/:eventID">
            <EventAdminPage />
          </Route>
          <Route exact path="/events/:eventID/mat/:matNumber">
            <SingleMatPage />
          </Route>
          <Route exact path="/eventAdmin/:eventID">
            <EventAdminPage />
          </Route>
          <Route exact path="/divisionAdmin/:divisionID">
            <DivisionAdminPage />
          </Route>
          <Route path="/passwordResetLandingPage/:encryptedIdInUrl">
            <PasswordResetLandingPage />
          </Route>
          <Route path="/ShowAllLoggins">
            <ShowAllLogins />
          </Route>
          <Route path="/displayBracketsForStyling">
            <DisplayBracket />
          </Route>

          <Route path="*">
            <h1>404 not found error, you probably went to the wrong page...</h1>
            <a href="/homepage">Go back to the homepage!</a>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

//this is a useless comment.

interface AppProps { }

export default App;
