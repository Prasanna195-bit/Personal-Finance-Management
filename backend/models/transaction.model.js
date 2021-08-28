/*
Transaction

Used to keep track of details of each transaction

Properties:-
transactionDate             Date of transaction
transactionType             Debit, Credit. Specifies the type of the transaction
amount                      Value of the transaction
description                 Description of the transaction
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO - Change transactionType from string to some form of enum if possible
const transactionSchema = new Schema({
    transactionDate: {
        type: Date,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;