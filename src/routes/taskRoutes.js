const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const authenticateToken = require('../middleware/authenticate')

router.post('/', authenticateToken, (req, res) => {
    taskService.createTask(req.body)
        .then(task => res.json(task))
        .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/',authenticateToken, (req, res) => {
    taskService.getAllTasks(req.headers)
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/:id', authenticateToken, (req, res) => {
    taskService.getTaskById(req.params.id)
        .then(task => {
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ message: 'Task not found.' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/:id', authenticateToken, (req, res) => {
    taskService.updateTaskById(req.params.id, req.body)
        .then(updatedTask => {
            console.log("updatedTask ", updatedTask)
            if (updatedTask) {
                res.json(updatedTask);
            } else {
                res.status(404).json({ message: 'Task not found.' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

router.delete('/:id', authenticateToken, (req, res) => {
    taskService.deleteTaskById(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json({ message: 'Task deleted successfully.' });
            } else {
                res.status(404).json({ message: 'Task not found.' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
