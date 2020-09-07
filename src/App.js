import React, { Component } from 'react';

import { createBrowserHistory } from 'history'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import PostReview from './components/PostReview/PostReview';

import { Counter } from './components/Hooks/Hooks';

import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter history={history}>
          <Route exact path='/' component={Login}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/post' component={PostReview}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
