const router = require('express').Router();
let Transaction = require('../models/transaction.model');

// proxy url is specified in package.json of the react app

// Get all Transactions
// proxy/transactions/
router.route('/').get((req, res) => {
    // GET Request
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json("Error - " + err));
});


// Add new Transaction
// proxy/transactions/add
router.route('/add').post((req, res) => {
    // POST Request
    const transactionDate = Date.parse(req.body.transactionDate);
    const transactionType = req.body.transactionType;
    const amount = Number(req.body.amount);
    const description = req.body.description;

    const newTransaction = new Transaction({
        transactionDate,
        transactionType,
        amount,
        description
    });

    // Saving the new transaction to DB
    newTransaction.save()
        .then(() => res.json("Transaction Added!"))
        .catch(err => res.status(400).json("Error - " + err));
});


// Get Transaction identified by 'id'
// proxy/transactions/get/:id
router.route('/get/:id').get((req, res) => {
    // GET Request
    Transaction.findById(req.params.id)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json("Error - " + err));
});


// Update Transaction identified by 'id'
// proxy/transactions/update/:id
router.route('/update/:id').post((req, res) => {
    // POST Request
    Transaction.findById(req.params.id)
        .then(transaction => {
            transaction.transactionDate = Date.parse(req.body.transactionDate);
            transaction.transactionType = req.body.transactionType;
            transaction.amount = Number(req.body.amount);
            transaction.description = req.body.description;

            transaction.save()
                .then(() => res.json("Transaction Updated!"))
                .catch(err => res.status(400).json("Error - " + err));
        })
        .catch(err => res.status(400).json("Error - " + err));
});


// Delete Asset identified by 'id'
// proxy/transactions/delete/:id
router.route('/delete/:id').delete((req, res) => {
    // DELETE Request
    Transaction.findByIdAndDelete(req.params.id)
        .then(transaction => res.json("Transaction Deleted..."))
        .catch(err => res.status(400).json("Error - " + err));
});


module.exports = router;