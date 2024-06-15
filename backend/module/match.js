// import mongoose module
const mongoose=require("mongoose");


const matchSchema=mongoose.Schema({
scoreone: Number,
scoretwo: Number,
teame1: String,
teame2:String,
});
// modul name : "Match" (PascalCase)
const match = mongoose.model("Match",matchSchema);



module.exports = match ;
