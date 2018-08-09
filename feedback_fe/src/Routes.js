// route configuration
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";   
import { App } from "./App";
import Team from "./components/team";
import Home from "./components/home";

export default function Routes(props) {
    return (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/team" component={Team} />
                </Switch>
            </App>
        </Router>
    )
}
    