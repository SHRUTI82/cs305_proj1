// import "./app.scss"
// import Home from './pages/home/Home'
// import Watch from './pages/watch/Watch'
// import Register from './pages/register/Register'
// import Login from './pages/login/Login'
// import { Routes, Route, Navigate} from "react-router-dom"
// import Details from "./pages/details/Details"
// import Profile from "./pages/profile/Profile"
// import { useCookies } from "react-cookie"
// import { useState, useEffect } from "react"

// const App = () => {

//  // const [Userstate, setUserstate] = useCookies(['']);
  
//   const [cookies, setCookie,removeCookie] = useCookies();
//   const user=cookies.email;

//   console.log("USER " + user)

//   const [user, setuser] = useState();


//   useEffect(() => {
//     if (cookies.email === "email") {
//       setuser(true);
//       console.log(user)
//     } else {
//       setuser(false);
//     }
//   }, [cookies.email]);

 
//   // //const [user,setuser]=useState(false);
//   //  let user = false;
 
//   // if(user!==null){
//   //   console.log(user)
//   //   console.log(user)
//   //   user=true;
//   // }

//  // console.log(user)
//   return (
// <>
// <Routes>


// <Route exact path='/' element={user? <Home /> : <Navigate to="/login"/> } />
// <Route path='/register' element={<Register/>} />
// <Route path='/login' element={!user? <Login /> : <Navigate to="/"/> } />
// <Route path='/home' element={!user? <Home /> : <Navigate to="/"/>} />

// {user && (
//   <>
//   <Route path='/home' element={<Home/>} />
//   <Route path='/watch' element={<Watch/>} />
//   <Route path='/movies' element={<Home type="movie"/>} />
//   <Route path='/series' element={<Home type="series"/>} />
//   <Route path='/profile' element={<Profile />} />
//   <Route path='/details' element={<Details/>} />
//   </>
// )
// }
// </Routes>

// </>
//   );
// };

// export default App;


import "./app.scss"
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { Routes, Route, Navigate} from "react-router-dom"
import Details from "./pages/details/Details"
import Profile from "./pages/profile/Profile"
import { useCookies } from "react-cookie"


const App = () => {
  const [Userstate] = useCookies(['user']);
  const user=Userstate.user;
  console.log(user);
  return (
<>
<Routes>

 <Route exact path='/' element={user? <Home /> : <Navigate to="/login"/> } />
 <Route path='/register' element={<Register/>} />
 <Route path='/login' element={!user? <Login /> : <Navigate to="/"/> } />
 <Route path='/home' element={!user? <Home /> : <Navigate to="/"/>} />


  {user && (

  // <>
  // <Route path='/watch' element={<Watch/>} />
  // <Route path='/movies' element={<Home type="movie"/>} />
  // <Route path='/series' element={<Home type="series"/>} />
  // </>


<>
   <Route path='/home' element={<Home/>} />
   <Route path='/watch' element={<Watch/>} />
   <Route path='/movies' element={<Home type="movie"/>} />
   <Route path='/series' element={<Home type="series"/>} />
   <Route path='/profile' element={<Profile />} />
   <Route path='/details' element={<Details/>} />
   </>
)}
</Routes>

</>
  );
};

export default App;