const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
   
    errScore:{
        type:String,
        // default:""
    },
    timeElapsed:{
        type:String,
        // default:""
    },
   
}, {timestamps:true});

let MemoryGame = mongoose.model("MemoryGame", gameSchema);
module.exports = {MemoryGame}
