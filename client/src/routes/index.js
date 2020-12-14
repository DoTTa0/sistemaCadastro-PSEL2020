import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import RegisterPage from '../view/Register/index.js'
import LoginPage from '../view/Login/index.js'
import DashboardPage from '../view/Dashboard/index.js'
import EditPage from '../view/Edit/index.js'


export default function Main() {
    return (
        <Router>
          <div>
            <Switch>
            <Route exact path="/">
                <LoginPage />
              </Route>
            <Route  path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/dashboard">
                <DashboardPage />
              </Route>
              <Route path="/edit/:id">
                <EditPage />
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
  

  
