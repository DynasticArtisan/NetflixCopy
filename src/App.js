import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        setUser(userAuth)
        console.log(userAuth)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])
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
