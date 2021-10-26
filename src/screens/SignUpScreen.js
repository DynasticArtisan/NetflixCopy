import React, { useRef } from 'react'
import { auth } from '../firebase'
import './signUpScreen.css'

const SignUpScreen = () => {
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(emailRef.current.value, passRef.current.value)
            .then((user)=>{
                console.log(user)
            }).catch(err => alert(err.message))
    }
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)
            .then((user)=>{
            console.log(user)})
            .catch(err => alert(err.message))
    }
    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input placeholder="Email" type='email' ref={emailRef}/>
                <input placeholder="Password" type='password' ref={passRef}/>
                <button type='submit' onClick={signIn}>Sign In</button>
                <h4>
                    <span className="signUpScreen--graytext">New to Netflix? </span>
                    <span className="signUpScreen__link" onClick={register}>Sign up now.</span>
                </h4>
            </form>

            
        </div>
    )
}


export default SignUpScreen
