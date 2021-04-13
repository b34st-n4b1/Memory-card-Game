import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

import Easy from "./components/levels/easy/Easy";
import Medium from "./components/levels/medium/Medium";
import Hard from "./components/levels/hard/Hard";
import Home from "./components/home/Home"

const Routes = () => {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/easy" exact component={Easy} />
        <Route path="/medium" exact component={Medium} />
        <Route path="/hard" exact component={Hard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
