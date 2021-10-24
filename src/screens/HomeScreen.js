import React from 'react'
import Banner from '../components/Banner/Banner'
import Nav from '../components/Nav/Nav'
import Row from '../components/Row/Row'
import './homescreen.css'
import requests from '../Request'

const HomeScreen = () => {

    
    return (
        <div className='homescreen'>
            
            {/* Nav */}
            <Nav/>
            {/* Banner */}
            <Banner/>
            {/* Rows */}
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
