const express = require('express');
const router = express.Router();

const { 
    getAllTasks,
    createTask,
    getSingleTask 
} = require('../controllers/task');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask)

module.exports = router;