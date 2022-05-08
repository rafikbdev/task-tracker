const { StatusCodes } = require('http-status-codes');

const Task = require('../models/Task');
const { 
    BadRequestError,
    NotFoundError
} = require('../errors/index');

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
    const { id:taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if(!task) {
        throw new NotFoundError(`No task with id: ${taskID}`)
    }
    res.status(StatusCodes.OK).json(task)
}

const updateTask = async (req, res) => {
    const { id:taskID } = req.params;
    const { reminder, completed } = req.body
    if(reminder === undefined && completed === undefined){
        throw new BadRequestError('Must update your task')
    }
    
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (req.body)
    if(!task) {
        throw new NotFoundError(`No task found with id: ${taskID}`)
    }
    res.status(StatusCodes.OK).json(task)
}

const deleteTask = async (req, res) => {
    const { id:taskID } = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});
    if(!task){
        throw new NotFoundError(`No task found with id: ${taskID}`)
    }
    res.status(StatusCodes.OK).json({msg: `Succesfully deleted task with id: ${taskID}`})
}

module.exports = { 
    getAllTasks,
    createTask,
    getSingleTask,
    deleteTask,
    updateTask 
} 