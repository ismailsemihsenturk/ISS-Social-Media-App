import express from "express"
import PostSchema from "../models/Post.js"
import UserSchema from "../models/User.js"

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {

    const newPost = await new PostSchema(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update a post
router.put("/:id", async (req, res) => {

    try {
        const post = await PostSchema.findById(req.params.id)
        if (post.userId === req.body.userId) {
            post.set(req.body)
            await post.save()
            res.status(200).json("post has been updated")
        }
        else {
            res.status(403).json("you can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

// Delete a post
router.delete("/:id", async (req, res) => {

    try {
        const post = await PostSchema.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await PostSchema.deleteOne({ _id: req.params.id });
            res.status(200).json("Post has been deleted")
        }
        else {
            res.status(403).json("you can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

// Like a post
router.put("/like/:id", async (req, res) => {

    try {
        const post = await PostSchema.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            post.likes = [...post.likes, req.body.userId]
            await post.save()
            res.status(200).json("Post has been liked")
        }
        else {
            post.likes.pull(req.body.userId)
            await post.save()
            res.status(200).json("Post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

// Get a post 
router.get("/:id", async (req, res) => {

    try {
        const post = await PostSchema.findById(req.params.id)
        const { userId, __v, ...other } = post._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get timeline
router.get("/timeline/:userId", async (req, res) => {

    try {
        const currentUser = await UserSchema.findById(req.params.userId)
        const userPosts = await PostSchema.find({ userId: currentUser._id })

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return PostSchema.find({ userId: friendId })
            })
        )
        // const friendPosts = await Promise.allSettled([
        //     currentUser.followings.map((friendId) => {
        //         return PostSchema.find({ userId: friendId })
        //     })
        // ])

        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get user's all post
router.get("/profile/:username", async (req, res) => {

    try {
        const user = await UserSchema.findOne({ username: req.params.username })
        const posts = await PostSchema.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
})

export { router }