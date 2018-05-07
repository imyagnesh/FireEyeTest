import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Page/Home";
import Alerts from "./Page/Alerts";
import Alert from "./Page/Alert";
import Sequences from "./Page/Sequences";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/alert/:id" component={Alert} />
      <Route path="/sequences" component={Sequences} />
    </Switch>
  </main>
);

export default Main;
