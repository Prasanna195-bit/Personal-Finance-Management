/*
Asset

Used to keep a track of all the assets held by the user

Properties:-
assetName            Name of the Asset
amount               Current valuation of the given Asset
lastUpdated          The last time the given Asset was modified
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    assetName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;