import React from 'react'
import { FaFlag } from 'react-icons/fa'

const Task = ({ task, onToggleReminder, onToggleCompleted }) => {
    return (
        <div 
            className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={() => onToggleReminder(task._id)}
        >
            <h3>
                <p className={`${task.completed ? 'completed' : ''}`}>{task.task}</p>
                <FaFlag onClick={() => onToggleCompleted(task._id)}/>
            </h3>
        </div>
    )
}

export default Task