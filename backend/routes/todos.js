const router = require('express').Router();
let Todo = require('../models/todo.model');

// All verified. Working

router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json("Error - " + err));
});

router.route('/add').post((req, res) => {
    const todoDescription = req.body.todoDescription;
    const todoResponsible = req.body.todoResponsible;
    const todoPriority = req.body.todoPriority;
    const todoCompleted = Boolean(req.body.todoCompleted);

    const newTodoEntry = new Todo({
        todoDescription,
        todoResponsible,
        todoPriority,
        todoCompleted
    });

    newTodoEntry.save()
        .then(() => res.json("Todo Entry added!"))
        .catch(err => res.status(400).json("Error - " + err));
});

router.route("/get/:id").get((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json("Error - " + err));
});

router.route("/update/:id").post((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            todo.todoDescription = req.body.todoDescription;
            todo.todoResponsible = req.body.todoResponsible;
            todo.todoPriority = req.body.todoPriority;
            todo.todoCompleted = Boolean(req.body.todoCompleted);

            todo.save()
                .then(() => res.json("Todo Entry Updated!"))
                .catch(err => res.status(400).json("Error - " + err));
        })
        .catch(err => res.status(400).json("Error - " + err));
});

router.route('/delete/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(todo => res.json("Todo Entry Deleted..."))
        .catch(err => res.status(400).json("Error - " + err));
});

module.exports = router;