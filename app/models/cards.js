/**
 * Created by Boman on 2016-01-26.
 */
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

/* Card --------------------------- */
var CardSchema = new Schema({
    name            : {type: String},
    colors          : [ColorSchema],
    colorIdentity   : {type: [String]},
    multiverseid    : {type: String},
    artist          : {type: String},
    cmc             : {type: Number},
    flavor          : {type: String},
    rarity          : {type: Schema.Types.ObjectId, ref:'RaritySchema'}, 
    power           : {type: Number},
    toughness       : {type: Number},
    type            : {type: String}, // ?
    subtypes        : {type: [String]}, // everything behind the line ?
    types           : [TypeSchema], // all types?
    text            : {type: String},
    manaCost        : {type: String}
});
var Card = mongoose.model('Card', CardSchema);

/* Rarity ------------------------- */
var RaritySchema = new Schema({
    rarity: {type: String}
});
var Rarity = mongoose.model('Rarity', RaritySchema);

/* Color -------------------------- */
var ColorSchema = new Schema({
    color: {type: String}
});
var Color = mongoose.model('Color', ColorSchema);

/* Type --------------------------- */

var TypeSchema = new Schema({
    type: {type: String}  
});
var Type = mongoose.model('Type', TypeSchema);

/* EXPORTS ------------------ */
module.exports = Card;
module.exports = Type;
module.exports = Color;
module.exports = Rarity;