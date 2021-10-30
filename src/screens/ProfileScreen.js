import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav/Nav'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import PlansScreen from './PlansScreen'
import './profileScreen.css'
const ProfileScreen = () => {
    const user = useSelector(selectUser)

    return (
        <div className="profileScreen">
           <Nav/>
           <div className="profileScreen__body">
               <h1>Edit Profile</h1>
               <div className="profileScreen__info">
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkLSB-Q6KkgopFOWYpGUTkewveRDQ5Rs1rQ&usqp=CAU" alt="profile-avatar" />
                   <div className="profileScreen__details">
                       <h2>{user.email}</h2>
                       <PlansScreen/>
                       <button onClick={()=> {auth.signOut() }} className="profileScreen__signOut">Sign Out</button>
                   </div>

               </div>
           </div>
        </div>
    )
}

export default ProfileScreen
