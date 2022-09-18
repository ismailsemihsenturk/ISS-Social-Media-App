import express from "express"
import UserSchema from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {

    try {
        // Generate new PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create new User
        const newUser = await new UserSchema();
        newUser.set(req.body);
        newUser.password = hashedPassword;

        // Save user and return response
        await newUser.save();
        res.status(200).json(newUser)

    } catch (error) {
        res.status(500).json(error)
    }

})


//LOGIN
router.post("/login", async (req, res) => {

    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("User not found");
            return
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json("wrong password");
            return
        }
        const { password, createdAt, updatedAt, __v, ...others } = user._doc;
        const userObj = others

        const acsessToken = jwt.sign({ id: userObj._id },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const decodedToken = jwt.verify(acsessToken, process.env.JWT_SECRET);

        userObj.acsessToken = acsessToken;
        res.status(200).json(userObj)
    } catch (error) {
        res.status(500).json(error)
    }

})


//JWT VALIDATION
router.post("/jwt", async (req, res) => {

    try {
        const acsessToken = req.body.acsessToken;
        const decodedToken = jwt.verify(acsessToken, process.env.JWT_SECRET);

        const user = await UserSchema.findById(decodedToken.id);
        if (!user) {
            res.status(404).json("User not found");
            return
        }

        const { password, createdAt, updatedAt, __v, ...others } = user._doc;
        const userObj = others

        res.status(200).json(userObj)
    } catch (error) {
        res.status(500).json(error)
    }
})



export { router } 