import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import App from "./App";
import Menu from "./components/menu/Menu";
import UserDashboard from "./components/user/UserDashboard";
import PrivateRoute from "./auth/PrivateRouter";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container col-md-8 offset-md-2">
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/dashboard" exact component={UserDashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
