const express = require('express');
const router = express.Router();
//Schemas
const Task = require('../models/task');


router.get('/', function(req, res, next){
    res.status(200).send("Welcome in Best Notes Api");
});

router.get('/getTasks/:name', function (req, res, next) {
    Task.find({username: req.params.name})
        .exec()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while getting list of tasks",
                error: err,
            });
        });
});

router.post('/newTask', function (req, res, next) {
    const {username, text} = req.body;
    const product = new Task({
        text,
        username,
        done: false,
    });
    product
        .save()
        .then(result => {
            res.status(201).send({
                message: "Task created successfully",
                'created task': result,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while creating task",
                error: err,
            });
        });
});

router.delete('/deleteTask', function (req, res, next) {
    const {_id} = req.body;
    Task.deleteOne({_id})
        .exec()
        .then(result => {
            if (!result.deletedCount) {
                res.status(404).send({
                    message: "Task with given ID not found",
                });
            } else {
                res.status(200).send({
                    message: "Task deleted successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while deleting task",
                error: err,
            });
        });
});

router.patch('/updateTask', function (req, res, next) {
    const {_id} = req.body;
    Task.updateOne({_id}, req.body)
        .exec()
        .then(result => {
            if (!result.nModified) {
                res.status(404).send({
                    message: "Task with given ID not found",
                });
            } else {
                res.status(200).send({
                    message: "Task updated successfully"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while updating task",
                error: err,
            });
        });
});


module.exports = router;
