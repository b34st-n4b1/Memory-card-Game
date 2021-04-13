const { MemoryGame } = require("../model/memorycard");
const fs = require("fs");
// const mongoose = require("mongoose")

exports.getRecords = (req, res) => {
  const game = new MemoryGame(req.body);
  game.save((err, record) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save records in DB",
      });
    }
    // res.json({ record });
    fs.writeFile(
      `./root/game_board/${game._id}.json`,
      JSON.stringify(record),
      (err, record) => {
        if (err) {
          return res.status(400).json({
            error: "failed to create file",
          });
        }
        res.json(record);
      }
    );
  });
};

// exports.getScore = (req, res) => {
//   MemoryGame.findOne().exec((err, record) => {
//     if (err || !record) {
//       return res.status(400).json({
//         error: "No Record found in DB",
//       });
//     }
//     res.json({ record });
//   });
// };
exports.getScore = (req, res) => {
    
};
