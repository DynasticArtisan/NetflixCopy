import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav/Nav'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
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
                       <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <p>Renewal date: 14/10/2021</p>
                            <div className="profileScreen__plan">
                                <div className="profileScreen__planInfo">
                                    <h5>Netflix Standart</h5>
                                    <p>1080p</p>
                                </div>
                                <button className="profileScreen__subscribe" >Subscribe</button>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="profileScreen__planInfo">
                                    <h5>Netflix Basic</h5>
                                    <p>480p</p>
                                </div>
                                <button className="profileScreen__subscribe" >Subscribe</button>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="profileScreen__planInfo">
                                    <h5>Netflix Premium</h5>
                                    <p>4K + HDR</p>
                                </div>
                                <button disabled className="profileScreen__subscribe" >Current Package</button>
                            </div>
                           <button onClick={()=> {auth.signOut() }} className="profileScreen__signOut">Sign Out</button>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default ProfileScreen
