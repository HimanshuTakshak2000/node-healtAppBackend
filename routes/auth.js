const router = require("express").Router();
const User = require("../Models/User");

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const validPassword = req.body.password == user.password;
            if (validPassword) {
                res.status(200).json(user);
            }
            else {
                res.status(400).json({ message: "Invalid credentials", status: false });
            }
        }
        else {
            res.status(400).json({ message: "User not found", status: false })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(200).json({ message: 'Email Id Already Exist', status: false })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            const data = await newUser.save();
            res.status(201).json(data);
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;