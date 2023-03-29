const mongoose = require("mongoose");

const LevelCheckSchema = new mongoose.Schema({
    id: {type: String, required: true},
    level: {
        type: Number,
        required: true,
    },
    lastlevel: {
        type: Number,
        required: true
    }
})

const LevelCheck = mongoose.model("LevelCheck", LevelCheckSchema);

module.exports = { LevelCheck };