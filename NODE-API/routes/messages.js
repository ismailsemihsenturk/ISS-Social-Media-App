import express from "express"
const router = express.Router();
import MessageSchema from "../models/Message.js"

// Add a message
router.post("/", async (req, res) => {

    const newMessage = new MessageSchema(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get messages
router.get("/:conversationId", async (req, res) => {

    try {
        const allMessages = await MessageSchema.find({
            conversationId: { $in: [req.params.conversationId] },
        })
        res.status(200).json(allMessages)
    } catch (error) {
        res.status(500).json(error)
    }
})


export { router }