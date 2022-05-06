const { StatusCodes } = require('http-status-codes');

const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if(!tasks.length){
            return res.status(StatusCodes.OK).json({msg: "No tasks where found..."})
        }
        res.status(StatusCodes.OK).json(tasks)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({ ...req.body })
        res.status(StatusCodes.CREATED).json(newTask)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
}

const getSingleTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if(!task) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: `No task with id: ${taskID}`})
        }
        res.status(StatusCodes.OK).json(task)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
}

const updateTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(StatusCodes.OK).json(task)
        if(!task) {
            return res.status(StatusCodes.NOT_FOUND).json({msg: `No task with id: ${taskID}`})
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            return res.status(StatusCodes.NOT_FOUND).json({msg: `No task found with id: ${taskID}`})
        }
        res.status(StatusCodes.OK).json({msg: `Succesfully deleted task with id: ${taskID}`})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
    }
}

module.exports = { 
    getAllTasks,
    createTask,
    getSingleTask,
    deleteTask,
    updateTask 
} 