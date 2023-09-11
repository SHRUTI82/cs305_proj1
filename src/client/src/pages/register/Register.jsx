import { useRef } from "react";
import { useState } from "react";
import {useCookies } from 'react-cookie'
import "./register.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Register() {
  const [email, setEmail] = useState("");
  //const [cookies, setCookie] = useCookies(['id']);
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");

  const history = useNavigate();


  async function loginsubmit(e) {
    e.preventDefault();

    if (email === "" || password === "" || username === "") {
      alert("Enter all feilds !")
    } else if (!email.includes("@")) {
      alert("Enter Valid Email !")
    }
    else {
      if (password.length < 6) {
        alert("Minimum length of password should be 6")
      }
      else {

        try {
          
          await axios.post("http://localhost:8000/api/auth/register", { username, email, password })
            .then(res => {
              if (res.data === "exist") {
                alert("user already exist")
                console.log("user already exist")

                // history('/')
              }
              else if (res.status === 201) {
                history('/login')
              }
            })
            .catch(e => {
              console.log("wrong details")
              console.log(e)

            })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }


  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          {/* 
        <button className="loginButton">Sign In</button> */}

        </div>
      </div>
      <div className="container">


        <form>
          <h1>SIGN UP</h1>
          <br />
          <label htmlFor="name">Name</label>
          <input type="name" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>

          <input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit" className="loginButton" onClick={loginsubmit} >Sign Up </button>
          <br />
          <span>
            Already a member?   <Link style={{ textDecoration: 'none' }} to="/" className='links'>      <b> Sign In </b> </Link>
          </span>

          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <b>Learn more</b>
          </small>
        </form>

      </div>
    </div>
  );
}