const router = require('express').Router();
let Asset = require('../models/asset.model');


// Get all Assets
// proxy/assets/
router.route('/').get((req, res) => {
    // GET Request
    // Finds all Assets and returns them
    // Incase of a failure, it returns Status 400 - Bad Request
    Asset.find()
        .then(assets => res.json(assets))
        .catch(err => res.status(400).json("Error - " + err));
})


// Add new Asset
// proxy/assets/add
router.route('/add').post((req, res) => {
    // POST Request
    // Used to add a new Asset to be tracked
    // Incase of a failure, it returns Status 400 - Bad Request
    
    console.log(req.body);

    // Creating a new Asset
    const assetName = req.body.assetName;
    const amount = Number(req.body.amount);
    const lastUpdated = Date.parse(req.body.lastUpdated);

    const newAsset = new Asset({
        assetName,
        amount: amount,
        lastUpdated,
    });

    // Saving the new Asset to the DB
    newAsset.save()
        .then(() => res.json("Asset Added!"))
        .catch(err => res.status(400).json("Error - " + err));
});


// Get Asset identified by 'id'
// proxy/assets/id
router.route('/get/:id').get((req, res) => {
    // GET Request
    // Used to search for an Asset with the given 'id' and return it if found
    // If not found, raises a Status code of 400 - Bad Request

    // Searching for the asset with the given id
    Asset.findById(req.params.id)
        .then(asset => res.json(asset))
        .catch(err => res.status(400).json("Error - " + err));
});


// Update Asset identified by 'id'
// proxy/assets/update/id
router.route('/update/:id').post((req, res) => {
    // POST Request
    // Used to update the given document (record) identified by the 'id'
    // Incase of failure, a Status Code of 400 - Bad Request is returned

    // Searching for the asset with the given id
    Asset.findById(req.params.id)
        .then(asset => {
            asset.assetName = req.body.assetName;
            asset.amount = Number(req.body.amount);
            asset.lastUpdated = Date.parse(req.body.lastUpdated);

            asset.save()
                .then(() => res.json("Asset Updated!"))
                .catch(err => res.status(400).json("Error - " + err));
        })
        .catch(err => res.status(400).json("Error - " + err));
});


// Delete Asset identified by 'id'
// proxy/assets/delete/id
router.route('/delete/:id').delete((req, res) => {
    // DELETE Request
    // Used to delete the document identified by the 'id'
    // Incase of failure, status code 400 is returned

    Asset.findByIdAndDelete(req.params.id)
        .then(asset => res.json("Asset Deleted..."))
        .catch(err => res.status(400).json("Error - " + err));
});

module.exports = router;