const express = require("express");
const userfriend = require("../models/userfriend");

const router = express.Router();


router.post("/friends:id", async (req, res) => {
    const post = new post({
        title: req.body.friends,
        content: req.body.content,
    })
    await friends.save()
    res.send(friends)
})

// GET FOR INDIVIDUAL FRIEND

router.get("friends/:id", async (req, res) => {
    try {
        const befriend = await Befriend.findOne({ username: req.params.id})
        res.send(befriend)
    }   catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
    })

router.delete("/friends/:id", async (req, res) => {
    try {
        await Befriend.deleteOne({ username: req.params.id })
        res.status(204).send()
    }   catch {
        res.status(404)
        res.send({ error: "Post doesn't exist" })
    }
})



