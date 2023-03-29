const mongoose = require("mongoose");

const FemboySchema = new mongoose.Schema({
    id: {type: String, required: false},
    link: {
        type: String,
        required: true,
    }
})

const Femboy = mongoose.model("FemboySchema", FemboySchema);

module.exports = { Femboy };