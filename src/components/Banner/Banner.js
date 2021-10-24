import React, { useEffect, useState } from 'react'
import './Banner.css'
import requests from '../../Request'
import axios from '../../axios'

const Banner = () => {
    const [movie, setMovie] = useState([])
    useEffect(()=>{
        async function fetchData(){
            // const res = await instance.get('/blabla')
            const res = await axios.get(requests.fetchNetflixOriginals)
            setMovie(res.data.results[Math.floor(Math.random()*res.data.results.length-1)])
            return res
        }
        fetchData()
    },[])


    function truncate (string, n){
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    return (
        <div className="banner" style={
            {
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`
            }
        }>
            <div className="banner__content">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h2 className="banner__description">{truncate(movie?.overview, 150)}</h2>
            </div>
            <div className="banner--fadeBottom"/>
        </div>
    )
}

export default Banner
