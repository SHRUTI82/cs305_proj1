const router = require("express").Router();
const User = require("../models/User_model");
const CryptoJS = require("crypto-js");
const verify = require("../verification");




//DELETE
router.route("/:id").delete(verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.route("/:id").put(verify, async (req, res) => {
  if (req.user.isAdmin  || req.user.id === req.params.id  ) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const filter = { _id: req.params.id };
      const update = req.body;
      const option = { new: true };

      const updatedUser = await User.findOneAndUpdate(filter, update, option);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});


//GET ALL
router.route("/").get(verify, async (req, res) => {
  const query = req.query.new;
  console.log(req.user.isAdmin);


  if (!req.user.isAdmin) {
    return res.status(403).json("You are not allowed to see all users!");
  }

  try {
    const users = await User.find().sort({ _id: query ? -1 : 1 }).limit(query ? 5 : undefined);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }

});

//GET

router.route("/find/:id").get( async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;