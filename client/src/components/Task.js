import React from 'react'

const Task = ({ task, onToggleReminder }) => {
    return (
        <div 
            className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={() => onToggleReminder(task._id)}
        >
            <h3>{task.task}</h3>
        </div>
    )
}

export default Task