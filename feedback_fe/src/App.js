import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './components/home';
import Team from './components/team';
import Leadership from './components/leadership';
import Support from './components/support';
import Thankyou from './components/thankyou';
import Header from './components/header';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            {/* <Header user={this.state.employee.label} /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/team/:id" component={Team} />
              <Route exact path="/leadership/:id" component={Leadership} />
              <Route exact path="/support/:id" component={Support} />
              <Route exact path="/thankyou" component={Thankyou} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
