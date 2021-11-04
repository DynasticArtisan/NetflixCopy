import React, { useEffect, useState } from 'react'
import './Banner.css'
import requests from '../../Request'
import axios from '../../axios'

const Banner = () => {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        async function fetchData(){
            try {
                setLoading(true)
                const res = await axios.get(requests.fetchNetflixOriginals)
                setMovie(res.data.results[Math.floor(Math.random()*res.data.results.length-1)])
                setLoading(false)
                return res
            } catch (err) {
                setLoading(false)
                return err
            }
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
                backgroundImage: movie ? `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")` : 'url("https://thebutlercollegian.com/wp-content/uploads/2019/03/netflix-image.jpg")'
            }
        }>
            {
                loading
                ?
                <h1>loadings</h1>
                :
                <div className="banner__content">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name || 'Watch the newest films with Netflix'}
                    </h1>


                    {
                        movie && <div className="banner__info">
                                    <div className="stars">
                                        {
                                            [...Array(Math.round(movie.vote_average || 0))].map((star, index) => <img key={index} src='https://cdn.picpng.com/star/icon-star-32065.png'
                                            className='banner__star' alt='rating'/>  )
                                        }
                                         
                                    </div>
                                    <div className="banner__buttons">
                                        <button className="banner__button">Play</button>
                                        <button className="banner__button">My List</button>
                                    </div>
                                    <h2 className="banner__description">{truncate(movie?.overview, 150)}</h2>
                                </div>
                    }


                </div>
            }
            

            <div className="banner--fadeBottom"/>
        </div>
    )
}

export default Banner
