import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import SignUpPage from './pages/SignUpPage/SignUpPage.component';
import './App.css';

function App() {
  const auth = false;
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => {
          if(auth) {
            return  <Redirect to="/home" />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={SignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
