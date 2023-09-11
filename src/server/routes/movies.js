const router = require("express").Router();
const Movie = require("../models/Movie_model");
const verify = require("../verification");




//GET

router.route("/find/:id").get(verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.route("/").post( verify, async (req, res) => {
  if (!req.user.isAdmin){
    res.status(403).json("You are not allowed!");
  }
    try{
      const newEntry = new Movie(req.body);
      const savedMovie = await newEntry.save();
      res.status(201).json(savedMovie);
    } 
    catch (err){
      res.status(500).json(err);
    }
  
});

//UPDATE

router.route("/:id").put(verify, async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("You are not allowed!");
  }
    try {
      const filter = { _id: req.params.id };
      const update = req.body;
      const option = { new: true };

      const updatedMovie = await Movie.findByIdAndUpdate(filter,update,option);
      res.status(200).json(updatedMovie);
    }
    catch (err) {
      res.status(500).json(err);
    }
  
});

//DELETE

router.route("/:id").delete( verify, async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("You are not allowed!");
  }
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Movie deleted ");
    } catch (err) {
      res.status(500).json(err);
    }
  
});


//GET ALL

router.route("/").get(verify, async (req, res) => {

  if (!req.user.isAdmin) {
    res.status(403).json("You are not allowed!");
  }
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }

});

//GET RANDOM

router.route("/random").get( verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEARCH
router.route("/search/:query").get(verify,async (req, res) => {
  try {
    const query = req.params.query;
    const movies = await Movie.find({ title: { $regex: query, $options: "i" } });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;