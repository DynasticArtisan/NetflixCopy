import React, { useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {
    const [show, setShow] = useState(false)
    const transition = () => {
        if(window.scrollY > 100){
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transition)
        return () => {
            window.removeEventListener('scroll', transition)
        }
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
        <div className="nav__content">
            <img
                className="nav__logo" 
                src="https://www.pngjoy.com/pngl/537/8356716_netflix-logo-graphic-design-transparent-png.png" 
                alt="logo" />
            <img
                className="nav__avatar" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkLSB-Q6KkgopFOWYpGUTkewveRDQ5Rs1rQ&usqp=CAU" 
                alt="avatar" />
        </div>

        </div>
    )
}

export default Nav
