const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/AuthModel");

const generateRandomAvatar = () => {
    const randomAvatar = Math.floor(Math.random() * 71);
    return `https://i.pravatar.cc/300?img=${randomAvatar}`;
  };

// Register route
router.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    const defaultAvatar = generateRandomAvatar();

    // Check if email already exists in the database
    User.findOne({ email })
        .then(existingEmail => {
            if (existingEmail) {
                return res.status(400).json({ error: "Email already exists" });
            }

            // Hash the password
            return bcrypt.hash(password, 10);
        })
        .then(hashedPass => {
            // Create a new user
            const newUser = new User({ username, email, password: hashedPass,avatar:defaultAvatar });

            // Save the new user to the database
            return newUser.save();
        })
        .then((data) => {
            // Send success response
            res.status(201).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });
});

router.post("/login",(req,res)=>{
    
    const {email,password} = req.body;
    
    User.findOne({email}).then(existingEmail=>{
        if(!existingEmail){
            return res.status(400).json({error:"Email not exist"});
        }

        return bcrypt.compare(password,existingEmail.password).then(isMatch=>{
            if(!isMatch){
                return res.status(400).json({error:"Invalid password"})
            }

            return res.status(200).json({
                id: existingEmail._id,
                email: existingEmail.email,
                username: existingEmail.username,
                role: existingEmail.role,
                avatar: existingEmail.avatar,
              });
        });
    })
})

module.exports = router;
