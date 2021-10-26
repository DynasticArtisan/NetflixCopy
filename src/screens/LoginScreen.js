import React, { useState } from 'react'
import './loginScreen.css'
import SignUpScreen from './SignUpScreen'

const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false)

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src="https://www.pngjoy.com/pngl/537/8356716_netflix-logo-graphic-design-transparent-png.png" alt="netflix" />
                <button className="loginScreen__button" onClick={()=>setSignIn(true)}>
                    SignIn
                </button>
                <div className="loginScreen__gradient"/>
            </div>
            <div className="loginScreen__body">
                {
                    
                signIn ? <SignUpScreen/> :
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel it any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="loginScreen__input">
                            <form>
                                <input type="email"
                                placeholder="Email Adress"  />
                                <button className="loginScreen__getStarted" onClick={()=>setSignIn(true)}>GET STARTED</button>
                            </form>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export default LoginScreen
