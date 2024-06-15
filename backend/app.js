// import express module
const express = require("express");
// import body-parser module
const bodyparser = require("body-parser");
//import mongoose module
const mongoose=require("mongoose");
// enetcomDB:BD name
mongoose.connect("mongodb://localhost:27017/enetcomDB"); 
// import Match Model
const Match = require("./module/match");
// import Player Model
const Player = require("./module/players");
// import teaam Model
const Team = require("./module/team");
// create expess application
const app = express();
// configure app with bodparser to send reponse =>json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// data base (fake)
// var matchestab = [
// { id: 1, scoreone: 1, scoretwo: 2, teamone: "AUS", teamtwo: "ARG" },
// { id: 12, scoreone: 1, scoretwo: 0, teamone: "TUN", teamtwo: "FRA" },
// { id: 35, scoreone: 6, scoretwo: 2, teamone: "ENG", teamtwo: "IRN" }];
// var playerstab = [
// {id:1,name:"MESSI",nbr:10,position:"atk"}, 
// {id:2,name:"CR7",nbr:7,position:"MID"},
// {id:3,name:"CR7",nbr:7,position:"MID",age:38}];
// var teamstab =[
//     {id:1,teams1:"AUS"},
//     {id:2,teams2:"ARG"},
//     {id:3,teams3:"TUN"},
//     {id:4,teams4:"ENG"},
//     {id:5,teams5:"FER"}];;

// business logic:REQ 1 =>  Get all matches
app.get('/matches/', (req, res) => {
    console.log("here Bl : REQ to get all matches");
    // res.json({ matches:matchestab});
    Match.find().then(
        (docs)=>{
            res.json({matches:docs});
        }
    );
})
// business logic:REQ 2 =>  Get all players
app.get('/players', (req, res) => {
    console.log("here Bl : REQ to get all players");
    Player.find().then(
        (docs)=>{
            res.json({players:docs});
        }
    )
    // res.json({players:playerstab });
})
// business logic:REQ 3= >  Get one matches by id
app.get("/matches/:id", (req,res)=>{
    console.log("here BL: REQ to get one matches by id");
    var id=req.params.id ;
    Match.findOne({_id:id}).then(
        (docs)=>{
            res.json({match:docs});
        }
    )
    // for (let i =0; i <matchestab.length; i++ ) {
    //     if (matchestab[i].id==id){
    //         res.json({match:matchestab[i]});
    //         break;
    //     }
    // }
    
})
// business logic:REQ 4 =>  Get one players by id
app.get("/players/:id", (req,res)=>{
    console.log("here BL: REQ to get one players by id");
    var id=req.params.id ;
    for (let i =0; i <playerstab.length; i++ ) {
        if (playerstab[i].id==id){
            res.json({players:playerstab[i]});
            break;
        }
    }

})
app.delete("/matches/:id",(req,res)=>{
    console.log("here BL :REQ to delete match by id ");
    var x= req.params.id;
    Match.deleteOne({_id:x}).then(
        (reponse)=>{
            console.log("here reponse fom DB",reponse);
            res.json({message:"deleted with success"});
        }
    )// business logic:REQ 5 =>  Delete match by id

    // for (let i = 0; i < matchestab.length; i++) {
    //  if (x==matchestab[i].id){
    //     matchestab.splice(i,1);
    //     res.json({message:`match N° ${i}delete  with success`});
    //     break;
    //  }else
    //  res.json({message : "n'est existe pas"})   
        
    // } 
});
// business logic:REQ 6 =>  add match 
app.post("/matches",(req,res)=>{
    console.log("here BL: REQ to add match",req.body);
    let matchObj = new Match(req.body);
    matchObj.save();
    // matchestab.push(req.body);
    res.json({messaage :"match added with success"});


});
// business logic:REQ 7 =>  Delete player by id
app.delete("/players/:id",(req,res)=>{
    console.log("here BL :REQ to delete player by id ");
    var x= req.params.id;
    for (let i = 0; i < playerstab.length; i++) {
     if (x==playerstab[i].id){
        playerstab.splice(i,1);
        res.json({message:`player N° ${i}delete  with success`});
        break;
     }else
     res.json({message : "n'est existe pas"})   
        
    }
});
// business logic:REQ 8 =>  add players 
app.post("/players",(req,res)=>{
    console.log("here BL: REQ to add players",req.body);
    playersObj = new Player(req.body);
    playersObj.save();
    // playerstab.push(req.body);
    res.json({messaage :"player added with success"});

});
// business logic:REQ 9 =>  Get all teams
app.get('/teams', (req, res) => {
    console.log("here Bl : REQ to get all teams");
    Team.find().then(
        (docs)=>{
            res.json({team:docs});
        }
    )
    // res.json({ teams:teamstab});
});
/// business logic:REQ 10= >  Get one teams by id
app.get("/teams/:id", (req,res)=>{
    console.log("here BL: REQ to get one teams by id");
    var id=req.params.id ;
    for (let i =0; i <teamstab.length; i++ ) {
        if (teamstab[i].id==id){
            res.json({teams:teamstab[i]});
            break;
        }
    }
    
});
// business logic:REQ 11 =>  Delete teams by id
app.delete("/teams/:id",(req,res)=>{
    console.log("here BL :REQ to delete teams by id ");
    var x= req.params.id;
    for (let i = 0; i < teamstab.length; i++) {
     if (x==teamstab[i].id){
        teamstab.splice(i,1);
        res.json({message:`teams N° ${i}delete  with success`});
        break;
     }else
     res.json({message : "n'est existe pas"})   
        
    }
});
// business logic:REQ 12 =>  add teams 
app.post("/teams",(req,res)=>{
    console.log("here BL: REQ to add tems",req.body);
    teamsObj = new Team(req.body);
    teamsObj.save();
    // teamstab.push(req.body);
    res.json({messaage :"teams added with success"});

});
// business logic:REQ 13 =>  edit mathes by id 
app.put("/matches/:id",(req,res)=>{
    console.log("here BL:REQ to edit match by id");
    var id=req.params.id
    Match.updateOne({_id:id},req.body).then(
        (reponse)=>{
            res.json({message:"updated with success"})
        }
    )
    // for (let i = 0; i < matchestab.length; i++) {
    //   if (matchestab[i].id==id){
    //        matchestab[i]=req.body;
    //        res.json({message:"match edition with success"});
    //        break;

    //   }};       
 }); 
 // business logic:REQ 14=>  edit player by id 
app.put("/players/:id",(req,res)=>{
    console.log("here BL:REQ to edit players by id");
    var id=req.params.id
    for (let i = 0; i < playerstab.length; i++) {
      if (playerstab[i].id==id){
           playerstab[i]=req.body;
           res.json({message:"player edition with success"});
           break;

      }};       
 });
//  bus 


//make app importable
module.exports = app; 
