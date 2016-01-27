/**
 * Created by Boman on 2016-01-26.
 */
var mongoose = require('mongoose');

var cardSchema = new Schema({
    name            : {type : String},
    colors          : {type: [String]},
    colorIdentity   : {type: [String]},
    multiverseid    : {type: String},
    artist          : {type: String},
    cmc             : {type: Number},
    flavor          : {type: String},
    rarity          : {type: String}, // make model
    power           : {type: Number},
    toughness       : {type: Number},
    type            : {type: String},
    subtypes        : {type: [String]},
    types           : {type: [String]},
    text            : {type: String},
    manaCost        : {type: String},
});

var Card = mongoose.model('Card', cardSchema);

module.exports = Card;