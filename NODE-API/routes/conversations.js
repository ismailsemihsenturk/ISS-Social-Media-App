import express from "express"
const router = express.Router();
import ConversationSchema from "../models/Conversation.js"

// new Conversation
router.post("/", async (req, res) => {
    const newConversations = new ConversationSchema({
        members: [req.body.senderId, req.body.receiverId]
    });

    try {
        const savedConversation = await newConversations.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }

})

// get Conversation of a user
router.get("/:userId", async (req, res) => {

    try {
        const conversation = await ConversationSchema.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get Conversation includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {

    try {
        const conversation = await ConversationSchema.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

export { router }