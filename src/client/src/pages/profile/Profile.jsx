import React, { useRef, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./profile.scss"
import WishlistItem from "./WishlistItem.jsx"
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useEffect } from 'react';
import Listitem from '../../components/listitem/Listitem';
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";




export default function  Pro ()  {
    // const name = "Tsering Wangzes"
    // const email = "Tsering@gmail.com"
    // const password = "123456"
    const [cookies] = useCookies(['id']);
    const [lst, setLst] = useState([]);
   
   
   
    

    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    const [clicknum, setclicknum] = useState(0);
    const [showarrow, setshowarrow] = useState(false);
    const [name,setName]= useState();
    const [email, setEmail] = useState();

    const myref = useRef();




useEffect (() =>{
    const userdata = async () => {
        try {
            console.log(cookies.id)
            const res = await axios.get(`http://localhost:8000/api/users/find/` + cookies.id, {
                headers: {
                    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0YWYyOGNhZTUzOGM4YTU1MGFjMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzE5MjcwOSwiZXhwIjoxNzE0NzI4NzA5fQ.GPhismig0E2uTrH9d4b4tBau_iEJcszlkP7fKnC98Wc"
                }
            }).then(
                res=> {
                    //lst.push(...res.data.mylist)
                   setLst((prevLst) => [...prevLst, ...res.data.mylist]);
                    setName(res.data.username);
                    setEmail(res.data.email);

                    console.log(lst[0]);
                    console.log(res.data.username);
                    console.log(typeof(lst));
                   
                   
                }

            )
        }
        catch (error) {
            console.error(error);
        }
    }
    

    userdata();
   
},[])

            

    const handleClick = (dir) => {
        setshowarrow(true)

        if (dir === "numleft" && clicknum > 0) {
            setclicknum(clicknum - 1);
            let leftSpace = myref.current.getBoundingClientRect().x - 40
            myref.current.style.transform = `translateX(${330 + leftSpace}px)`
        }

        if (dir === "numright" && clicknum < 3) {
            setclicknum(clicknum + 1)
            let rightSpace = myref.current.getBoundingClientRect().x - 40
            myref.current.style.transform = `translateX(${-330 + rightSpace}px)`

        }
    }

    //   https://static.vecteezy.com/system/resources/thumbnails/006/076/792/small/10-abstract-modern-attractive-black-and-red-background-free-vector.jpg



    return (
        <>
            <div className='box'>
                <div className='coverImage'>
                    <img src=" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAuAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIRABAQEAAgIDAQEBAQAAAAAAAAERAiExQRJRYYFxIgP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A4aACxr/0zZZz+XU3rM/GSZs3x7BBUAa42ze81EAF0oBeN45vubF45ve/heN29W556BFl6qAAekAUWzJLnVBlYtmcZftkGpZN8/xEWUEFAQAFDj5OWW2yZPoCeTlm9dxAFvnsPWoDV5dZM7TyigGk2rOO9wGVktCXAIvyvj7SoDdy+L6+vbNmEuUt0GuXP5d3yz6IAgAAANc7OXK2STb4kxkAGuN+N1kAWTbJ9ougfhEUEWQsmSgLbftOwyZu/wABdn714Le6lnUKAvG/85vXlKsnsE9nK7QAa4zZb11N7ZmW93FwEt8/pjWcZxt874y+P9T5WSyXqgyLvegIAACgioANcc2fLc94l/xAXzekWXLsOUk5WQBeNzf1Oi+evABJv+kOwX8QADDS/YDfG8rwyXqXqaxszM/p4AoIALvQCAAAACoC+fNRaARbs8+U6WZb31AQpuTPQAAAi4ACgINdZ+oCDV49S2+WQMCgIAAAAAAACoAKEXAPSYsUEGujZATOjC8vxn5A1gztAa6OU+Nsub+XWFBdGQAAAAAAAAAAF01ABdQBdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=" alt='' />
                </div>

                <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
     
        </div>
      </Link>
                <div className="per_details">
                    <div>

                        <img className="logo" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="profile">
                        <label className="text" htmlFor="">Name : {name}</label>  <br /> <br />
                        <label className="text" htmlFor="">Email : {email}</label> <br /> <br />
                        {/* <label className="text" htmlFor="">Password : {password}</label> */}


                    </div>
                    <br /> <br /> <br />
                </div>

                <div className="wishlist">
                    <span className="nameList">MY WISHLIST</span>
                    <div className="onelist">
                        <ArrowLeftIcon className="arrow left"
                            onClick={() => handleClick("numleft")}
                            style={{ display: !showarrow && "none" }}
                        />

                        <div className="onelistContainer" ref={myref}>
                             {
                                lst.map((item,i) => {
                                    
                                  return  <WishlistItem index={i} item={item} />

                               
                                })  
                            }
                             

                       
                          
                           
                           
                                    
                                
                        </div>

                        <ArrowRightIcon
                            className="arrow right"
                            onClick={() => handleClick("numright")}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}