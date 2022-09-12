import express from "express"
import UserSchema from "../models/User.js"
import bcrypt from "bcryptjs"

const router = express.Router();

// Update User
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                // Generate new PASSWORD
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                req.body.password = hashedPassword;
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await UserSchema.findById(req.params.id)
            user.set(req.body)
            user.save()
            res.status(200).json("Account has been updated")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("You can update only your account")
    }
})


// Delete User
router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await UserSchema.deleteOne({ _id: req.params.id });
            res.status(200).json("Account has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        return res.status(403).json("You can delete only your account")
    }
})


// Get a User
router.get("/", async (req, res) => {

    //Query
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId ? await UserSchema.findById(req.query.userId) : await UserSchema.findOne({ username: username })
        const { password, updatedAt, createdAt, __v, ...other } = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Follow a User
router.put("/follow/:id", async (req, res) => {

    if (req.body.userId !== req.params.id) {
        try {
            // Wants to be followed
            const user = await UserSchema.findById(req.params.id)
            // Follower
            const currentUser = await UserSchema.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {

                user.followers = [...user.followers, currentUser._id]
                currentUser.followings = [...currentUser.followings, user._id]

                await user.save();
                await currentUser.save();

                res.status(200).json("user has been followed")
            }
            else {
                res.status(403).json("you already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(404).json("you can't follow yourself")
    }
})

// UNfollow a User
router.put("/unfollow/:id", async (req, res) => {

    if (req.body.userId !== req.params.id) {
        try {
            // Wants to be Unfollowed
            const user = await UserSchema.findById(req.params.id)
            // UnFollower
            const currentUser = await UserSchema.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {

                user.followers.pull(currentUser._id)
                currentUser.followings.pull(user._id)

                await user.save();
                await currentUser.save();

                res.status(200).json("user has been unfollowed")
            }
            else {
                res.status(403).json("you already unfollow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(404).json("you can't unfollow yourself")
    }
})


//Get Friends 
router.get("/friends", async (req, res) => {

    //Query
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId ? await UserSchema.findById(req.query.userId) : await UserSchema.findOne({ username: username })
        const { followings, followers, ...other } = user._doc;

        const userFollowings = await Promise.all(
            followings.map((friend) => {
                return UserSchema.findById({ _id: friend })
            }));

        let friendList = [];
        userFollowings.map((friend) => {
            const { _id, username, profilePicture, firstname, lastname } = friend;
            friendList.push({ _id, username, profilePicture, firstname, lastname })
        });

        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
})




export { router } 