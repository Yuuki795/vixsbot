const mongoose = require("mongoose");

const HentaiSchema = new mongoose.Schema({
    id: {type: String, required: false},
    link: {
        type: String,
        required: true,
    }
})

const Hentai = mongoose.model("Hentai", HentaiSchema);

module.exports = { Hentai };