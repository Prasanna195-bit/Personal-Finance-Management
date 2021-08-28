const router = require('express').Router();
let User = require('../models/user.model');

// Get all Users
router.route('/').get((req, res) => {
    // GET Request
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Server Error - All Users GET - " + err));
})

// Add new User
router.route('/add').post((req, res) => {
    // POST Request

    // Creating a new user
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    // Saving to DB
    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Server Error - User POST - " + err));
})

// Get User identified by 'id'
router.route('/get/:id').get((req, res) => {
    // GET Request

    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Server Error - User GET - " + err));
})

// Update user identified by 'id'
router.route('/update/:id').post((req, res) => {
    // POST Request
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save()
                .then(() => res.json("User updated!"))
                .catch(err => res.status(400).json("Server Error - Update User POST - " + err));
        })
})

// Delete user identified by 'id'
router.route('/delete/:id').delete((req, res) => {
    // DELETE Request
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted..."))
        .catch(err => res.status(400).json("Server Error - User DELETE - " + err));
})

module.exports = router;