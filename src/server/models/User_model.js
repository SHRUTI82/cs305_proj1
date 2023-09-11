const mongoose = require("mongoose");

const User_schema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false },
        mylist: { type: Array}
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", User_schema);