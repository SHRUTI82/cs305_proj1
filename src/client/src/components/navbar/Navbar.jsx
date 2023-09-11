import React, { useState, useEffect, useRef } from 'react'
import "./navbar.scss"

import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import LogoutIcon from '@mui/icons-material/Logout';

// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useCookies } from 'react-cookie';


function Navbar() {

  const [totop, settotop] = useState(false);
  const[userState, setUserState,removeuserState] = useCookies(['user']);
  const[cookie, setcookie,removecookie] = useCookies(['id']);
  const handleLogout = () => {
    removeuserState('user',{path:'/'})
    removecookie('id',{path:'/'})
  }

  window.onscroll = () => {
    settotop(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);



  const handleSearch = () => {
    console.log("handle search  " + searchQuery)
    axios
      .get(`/movies/search/${searchQuery}`,
        {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0OTkwOGNhZTUzOGM4YTU1MGFiOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MTgyNywiZXhwIjoxNjgzMzY0NjI3fQ.lGIyHDxpMjawxF-oxUr7XRw7Xvhtfsd3jAFg2NF17Jg"
          }
        })
      .then((res) => {
        console.log(res.data)
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchClicked(false);
    console.log("search query is  " + searchQuery)
  };

  return (
    <div className={totop ? "navbar totop" : "navbar"}>
      <div className="container">
        <div className='left'>
          <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />

          <Link to="/" className="link">
            <span>HomePage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>

          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>

          {/* <span>New and popular</span> */}
          <Link to="/profile" className="link">
          <span>My-list</span>
          </Link>
        </div>
        <div className='right'>
          <div className='searchbox'>
            <TextField
              label='Search'
              value={searchQuery}
              onChange={handleSearchInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={(e)=>{handleSearch(e);setSearchClicked(true);}} >
                      <SearchIcon className="mui" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>


          {searchResults.length > 0 ? (
            <div className='searchResults' ref={dropdownRef}>
              {searchResults.map((result) => (
                <Link to="/details" state={{ movie: result }} className='link'>
                  <img src={result.img} />
                  <span>{result.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            searchClicked && (
              <div className='searchResults' ref={dropdownRef}>
                <div className='noResults'>
                  No results found.
                </div>
              </div>
            )
          )}

          <Link to="/profile" className="link">
          <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" />
              </Link>

          <div className="profileLogo">
          <Link to="/login" className="link" onClick={handleLogout}>
          
            <LogoutIcon className="mui" />
            </Link>
            
            <div className="dropdown">

              {/* <span>Profile</span> */}
              {/* <span>Account</span> */}
              {/* <span>Settings</span> */}
              <Link to="/login" className="link" onClick={handleLogout}>
              <span>Logout</span>
              </Link>
            </div>
          </div >

        </div>


      </div>
    </div>
  )
}

export default Navbar