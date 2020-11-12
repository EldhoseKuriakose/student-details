import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import SignUpPage from './pages/SignUpPage/SignUpPage.component';
import './App.css';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const registered = useSelector((state) => state.user.registered);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => {
          if(currentUser) {
            return  <HomePage />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/login" render={() => {
          if(currentUser) {
            return <Redirect to="/" />
          } else {
            return <LoginPage />
          }
        }} />
        <Route path="/register" render={() => {
          if(currentUser) {
            return <Redirect to="/" />
          } else if(registered) {
            return <Redirect to="/login" />
          } else {
            return <SignUpPage />
          }
        }} />
      </Switch>
    </div>
  );
}

export default App;
