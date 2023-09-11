
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import {useState, useEffect} from "react";
import axios from 'axios'
import {Link} from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async() =>{
      try{
        const res = await axios.get(`/movies/random?type=${type}`,
        {
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
          }
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    }
    getRandomContent();
  },[type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre"
          onChange={(e) => setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="romance">Horror</option>
            <option value="comedy">Comedy</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Action</option>
          </select>
        </div>
      )}
    
      <img src={content.img}/>
      <div className="info">
      
        <span className="desc">{content.title}</span>
        <div className="buttons">
        <Link to="/watch" state={{movie:content}} className="link">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
        </Link>
        <Link to="/details" state={{movie:content}} className="link">
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
