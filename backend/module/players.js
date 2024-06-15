// import mongoose module
const mongoose=require("mongoose");

const playerSchema =mongoose.Schema({
    name:String,
    nbr: Number,
    position: String,
    age: Number
    });
    // modul name : "Player" (PascalCase)
const player = mongoose.model("Player",playerSchema);



module.exports = player ;