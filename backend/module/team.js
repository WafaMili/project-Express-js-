// import mongoose module
const mongoose=require("mongoose");

const teamSchema =mongoose.Schema({
    name: String,
    contry:String,
    fundation:String,
    stadium:String,   
    });
// modul name : "Team" (PascalCase)
const team = mongoose.model("Team",teamSchema);

module.exports = team ;