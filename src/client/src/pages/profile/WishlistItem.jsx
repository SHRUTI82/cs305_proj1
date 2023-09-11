
import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import "./wishlistItem.scss"



export default function WishlistItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    const [cookies] = useCookies(['id']);
    console.log(item);

  
    const remove = async () => {
        try {
          console.log(cookies.id)
          const response = await axios.get(`http://localhost:8000/api/users/find/` + cookies.id,  {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
            }
          }).then(
            response => {
              const user = response.data;
              const userId = user._id;
              console.log(userId);
              console.log(movie._id);
            
              //user.mylist.push(movie._id);
              const index = user.mylist.indexOf(movie._id);
              const x = user.mylist.splice(index, 1);
    
    
    
    
              axios.put("http://localhost:8000/api/users/" + cookies.id, { mylist: user.mylist } ,{
                headers: {
                  token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
                }
              })
                .then(response => {
                  console.log(response.data);
                })
                .catch(error => {
                  console.error(error);
                });
                window.location.reload();
    
    
            })
    
        } catch (error) {
          console.error(error);
        }
    
      }
   
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/movies/find/" + item,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
                        }
                    }
                );
                console.log(res.data)
                setMovie(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getMovie();
    }, [item])




    return (
        // <Link to={{pathname: "/watch",movie:movie}}>
        // <Link to="/watch" state={{movie:movie}}>
        <div className="wishlistitem" state={{ movie: movie }}
            style={{ left: isHovered && index * 330 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >


            <img
                //src="https://www.boredpanda.com/blog/wp-content/uploads/2022/06/aesthetically-pleasing-movies-18-62975cb878436__880.jpg"
                src={movie.img}
                alt=""
            />

            {isHovered && (
                <>
                    <video src={movie.trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <Link to="/details" state={{ movie: movie }}>
                                <PlayCircleOutlineOutlinedIcon className="eachicon" />
                            </Link>

                            <Link style={ { color: 'white' }} >
               <RemoveCircleOutlineIcon className="eachicon" onClick={remove} />
               </Link>
                            

                            
                        </div>
                        <div>{movie.title}</div>
                        <div className="itemInfoTop">
                            
                            <span>{movie.duration}</span>
                            <span className="Age Limit">{movie.limit}+</span>
                            <span>{movie.year}</span>
                           
                        </div>
                        

                        <div className="desc">{movie.desc}</div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>

            )}
        </div>
        // </Link>
    );
}




