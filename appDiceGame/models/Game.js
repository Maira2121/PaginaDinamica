const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
    type: { type: String, trim: true, default: "" },
    gamers: [{ idGamer: { type: Schema.ObjectId }, 
        name: { type: String,  required: "This name is required" }, 
        score: {type: String, default:"0"} }],
    inProgress: { type: Boolean, default: true},
    winner: {
        id: {type: String,},
        name: {type: String, default: "Aún no hay un ganador"},
    }
});

module.exports = mongoose.model('Game', GameSchema)