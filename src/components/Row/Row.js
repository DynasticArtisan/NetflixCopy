import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import './Row.css'

const Row = ({title, fetchUrl, isLargeRow = false}) => {
    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original"
    useEffect(()=>{
        async function fetchData (){
            const res = await axios.get(fetchUrl)
            setMovies(res.data.results)
        }
        fetchData()
    },[fetchUrl])
    if(!movies[0]){
        return null
    }
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && 
                                    <div className="row__movie" key={movie.id}>
                                        <img 
                                        className={`row__poster ${isLargeRow && 'row__poster--large'}`}
                                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                        alt={movie.name}
                                        />
                                        <h4>{movie.name || movie.title || movie.original_title}</h4>
                                    </div>
                                )}
            </div>

        </div>
    )
}

export default Row
