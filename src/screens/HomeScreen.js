import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner/Banner'
import Nav from '../components/Nav/Nav'
import Row from '../components/Row/Row'
import './homescreen.css'
import requests from '../Request'
import { useDispatch, useSelector } from 'react-redux'
import { selectSubscription, selectUser } from '../features/userSlice'
import { useHistory } from 'react-router'


const HomeScreen = () => {
    const user = useSelector(selectUser)
    const subscription = useSelector(selectSubscription)
    const redirect = useHistory().replace
    const dispatch = useDispatch()


    if(!subscription?.role){
        redirect('/profile')
    }

    return (
        <div className='homescreen'>
            <Nav/>
            <Banner/>
            <Row
                title='Netflix Originals'
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
    )
}

export default HomeScreen
