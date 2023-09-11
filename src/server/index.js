require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require('cors');
app.use(cors());
app.use(express.json());


const getmovie=require("./routes/movies")
const register=require("./routes/Authentication")
const userRoute = require("./routes/subscribers")
const listRoute = require("./routes/lists");
const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`Server start at Port No :${PORT}`)
})

app.use('/api/movies', getmovie)
app.use('/api/auth', register)  
app.use('/api/users', userRoute);
app.use('/api/lists', listRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});