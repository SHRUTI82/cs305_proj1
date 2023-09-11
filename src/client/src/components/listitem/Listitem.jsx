import "./listitem.scss"

import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import { useCookies } from 'react-cookie';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';


export default function Listitem({index , item}) {
  const [isHovered, setIsHovered]=useState(false);
  const [movie, setMovie]=useState({});
  const [cookies] = useCookies(['id']);
  const [clicked, setClicked] = useState(false)
  console.log(item);
  // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  


  

  const AddList = async () => {
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
          if (!user.mylist) {
            user.mylist = []; 
          }
          //user.mylist.push(movie._id);
          if (!user.mylist.includes(movie._id)) {
            user.mylist.push(movie._id);
          }
          setClicked(true);
          




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


        })

    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    const getMovie = async() =>{
      try{
        const res = await axios.get("http://localhost:8000/api/movies/find/" + item,
        {
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
          }
        }
        );
        console.log(res.data)
        setMovie(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getMovie();
},[item])

  

  


  

  return (
    // <Link to={{pathname: "/watch",movie:movie}}>
    <Link to="/details" state={{movie:movie}}>
    <div className="listitem" state={{movie:movie}}
    style={{ left: isHovered && index * 330}}
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}
    >


        <img 
        //src="https://www.boredpanda.com/blog/wp-content/uploads/2022/06/aesthetically-pleasing-movies-18-62975cb878436__880.jpg"
        src = {movie.img} 
        alt="" 
        />

        {isHovered && (
          <>
             <video src = {movie.trailer} autoPlay={true} loop />
             <div className="itemInfo">
              <div className="icons">
              <Link style={ { color: 'white' }} to="/watch" state={{movie:movie}}>
               <PlayCircleOutlineOutlinedIcon className="eachicon"/>
              </Link>
              {/* to add to wishlist */}
             {
              clicked?( 
               
                            <PlaylistAddCheckCircleIcon className="eachicon" />
                         
                          

              ):(
                <>
   <Link style={ { color: 'white' }} >
               <AddCircleOutlineOutlinedIcon className="eachicon" onClick={AddList} />
               </Link>
                </>
              )
             }
                {/* <Link style={ { color: 'white' }} >
               <AddCircleOutlineOutlinedIcon className="eachicon" onClick={AddList} />
               </Link> */}
               <Link style={ { color: 'white' }} >
               <ThumbUpAltOutlinedIcon className="eachicon"/>
               <ThumbDownOffAltOutlinedIcon className="eachicon"/>
               </Link>
              </div>
              <div>{movie.title}</div>
            <div className="itemInfoTop">
            
<div>

  {
    movie.isSeries?(
      <><span>Episodes: </span><br /></>

    ):(
      <><span>{movie.durationHr}hrs:{movie.durationMin}mins</span><br /></>
        )
  }
</div>

             <span className="Age Limit">{movie.limit}+</span>
             <span>{movie.year}</span>
           
            </div>
            

            <div className="desc">{movie.desc}</div>
          <div className="genre">{movie.genre}</div>
      </div>
    </>
    
  )}
</div>
</Link>
);
}


