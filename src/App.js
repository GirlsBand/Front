import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage.js';
import FormPage from './FormPage.js';
import ApartmentsPage from './ApartmentsPage/ApartmentsPage';

class App extends Component {
  render() {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/form' component={FormPage} />
            <Route path='/apartments' component={ApartmentsPage} />
          </Switch>
      </Router>
    );
  }
}

export default App;
