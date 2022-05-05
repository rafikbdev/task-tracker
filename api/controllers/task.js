const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if(!tasks.length){
            return res.status(200).json({msg: "No tasks where found..."})
        }
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({ ...req.body })
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = { getAllTasks, createTask } 