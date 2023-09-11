const router = require("express").Router();
const List = require("../models/List_model");
const verify = require("../verification");

//CREATE

router.route("/").post( verify, async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).json("You are not allowed!");
    }
        const newEntry = new List(req.body);
        try {
            const saveList = await newEntry.save();
            res.status(201).json(saveList);
        } catch (err) {
            res.status(500).json(err);
        }
    
});

//DELETE

router.route("/:id").delete( verify, async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(403).json("You are not allowed!");
    }
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been delete...");
        }catch (err){
            res.status(500).json(err);
        }
    
});

//GET

router.route("/").get( verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample:{size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;