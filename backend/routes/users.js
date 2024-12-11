const express = require("express");
const User = require("../models/AuthModel");
const router = express.Router();

router.get("/",(req,res)=>{
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Server error"});
        });
})

router.delete("/:email", (req, res) => {
    User.findOneAndDelete(req.params.email)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(deletedUser);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });
});

module.exports = router;