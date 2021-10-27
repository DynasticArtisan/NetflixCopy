import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })  
    return unsubscribe
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        {           
          !user 
          ? <LoginScreen/> 
          : <Switch>
              <Route path='/profile' component={ProfileScreen}/>
              <Route path='/' component={HomeScreen} exact/>
              <Redirect to='/'/>
            </Switch>
        }
      </Router>
    </div>
  );
}

export default App;
