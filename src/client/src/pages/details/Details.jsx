import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./details.scss"
import StarRateIcon from '@mui/icons-material/StarRate';
import { PlayArrow } from "@material-ui/icons";
import { ArrowBackOutlined } from "@material-ui/icons";
const Details = () => {

    const location = useLocation();
    const movie = location.state.movie;

    console.log(movie.title);

    const item = {
        id: 1,
        name: movie.title,
        time: movie.hour,
        desc: movie.desc,
        genres: movie.genre,
        cover:movie.img,
        trailer: movie.trailer,
        video: movie.video,
        date: movie.year,
        hour: movie.hour,
        min: movie.min,
        isSeries:movie.isSeries,
        episodes:movie.episodes
    }

    return (
        <>

            <div className='box'>
            <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          
        </div>
      </Link>
                <div className='coverImage'>
                    <img src={item.cover} alt='' />
                </div>
                <div className='content flex'>
                    <div className='details row'>
                        <h1 className="movie_name" >{item.name}</h1>
                      
                       {/* if(isSeries===false)
                        {<div className='rating flex'>
                          
                            <br />
                            <br />
                            <span className="plytime">Duration : {item.hour}hrs: {item.min}mins</span>
                            <label className="ratelabel">{item.time}</label>
                        </div>}
                        else{
                            <><br /><br /><span className="plytime">Episodes: {item.episodes}</span>
                            <label className="ratelabel">{item.time}</label></>
                        } */}

                        <div>
                            {
                                item.isSeries?(
                                    <><br /><br /><span className="plytime">Episodes:</span>
                                    <label className="ratelabel">{item.episodes}</label></>
                                ):(
                                    <><br /><br /><span className="plytime">Duration : {item.hour}hrs: {item.min}mins</span>
                                    <label className="ratelabel">{item.time}</label></>
                                )
                            }

                        </div>
                        <br />
                        <p className="desc">{item.desc}</p>
                        <br />
                        <div className='cast'>
                            <h4>
                                <span className="ratelabel">Genres </span>
                                <label className="ratelabel"> {item.genres}</label>
                               
                            </h4>
                           
                        </div>
                        <br />
                        <div className="btns">
                            <Link style={{ textDecoration: 'none' }} to="/watch" state={{ movie:movie }}> 
                        <button className='primary-btn'>
                            <i><PlayArrow /></i> TRAILER
                        </button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/watch" state={{ movie:movie }}> 

                        <button className='primary-btn2'>
                            <i><PlayArrow /></i> PLAY
                        </button>
                            </Link>

                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Details