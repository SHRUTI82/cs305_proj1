import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom"
// import { useEffect } from "react";
import "./watch.scss";


export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;


  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      <iframe width="1434" height="600" overflow-auto
      src={movie.video}
      title={movie.title} 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen="true"></iframe>

    </div>
  );
}
