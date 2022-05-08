import React from 'react'

const Task = ({ task }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}>
            <h3>{task.task}</h3>
        </div>
    )
}

export default Task