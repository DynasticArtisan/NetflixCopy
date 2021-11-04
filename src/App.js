import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import db, { auth } from './firebase';
import { login, logout, selectUser, setSubscription } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import Loader from './components/Loader/Loader';


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        db.collection('customers')
          .doc(userAuth.uid)
          .collection('subscriptions')
          .get()
          .then(snap => {
              snap.forEach(async subscription => {
              const { role, current_period_end, current_period_start } = subscription.data()
              dispatch(setSubscription( {
                  role,
                  currentPeriodStart: current_period_start.seconds,
                  currentPeriodEnd: current_period_end.seconds
              } ))
          })
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
        setLoading(false)  
      })
      } else {
        dispatch(setSubscription(null))
        dispatch(logout())
        setLoading(false)  
      }
      
    })

    return unsubscribe
  }, [])

  return (
    <div className="App">
      {
        loading 
        ?   
        <Loader/>
        :
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
      }
    </div>
  );
}

export default App;
