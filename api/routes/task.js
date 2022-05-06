const express = require('express');
const router = express.Router();

const { 
    getAllTasks,
    createTask,
    getSingleTask,
    deleteTask
} = require('../controllers/task');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).delete(deleteTask);

module.exports = router;