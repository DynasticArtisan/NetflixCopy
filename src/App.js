import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

function App() {
  const user = null
  return (
    <div className="App">
      <Router>
        {           
          !user 
          ? <LoginScreen/> 
          : <Switch>
              <Route path='/profile' />
              <Route path='/' component={HomeScreen} exact/>
              <Redirect to='/'/>
            </Switch>
        }
      </Router>

    </div>
  );
}

export default App;
