const router = require("express").Router();
const User = require("../models/User_model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
var AES = require("crypto-js/aes");

router.use(bodyParser.json());
//REGISTER
router.route("/register").post(async (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.username) {
        return res.status(400).json({ message: "Username is required" });
    }
    
    const newEntry = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(req.body.password),
            process.env.SECRET_KEY
        ).toString(),
    });
    try {
        const user = await newEntry.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.route("/login").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
       
        if(!user) {
          return  res.status(401).json("Wrong  username or password !");
        } 

        const codes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = codes.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
          return  res.status(401).json("Wrong  username or password !");
        }

        const expiresIn = 365*24*60*60;
        const Token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn}
        );

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, Token });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;