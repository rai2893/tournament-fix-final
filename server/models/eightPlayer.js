let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let eightPlayerModelSchema = new Schema ({
    playerName: String,
    Wins: Number,
    Losses: Number
})
let eightPlayerSchema = new Schema({
    rounds: [{
        round1: [{
            pair1: [eightPlayerModelSchema],
            pair2: [eightPlayerModelSchema],
            pair3: [eightPlayerModelSchema],
            pair4: [eightPlayerModelSchema]
        }],
        round2: [{
            pair5: [eightPlayerModelSchema],
            pair6: [eightPlayerModelSchema]
        }],
        round3: [{
            pair7: [eightPlayerModelSchema]
        }],
        winner1: String, winner2: String, loser1: String
    }],
    userID: String
},
{
    collection: "tournament"
});

module.exports = mongoose.model('tournament', eightPlayerSchema);