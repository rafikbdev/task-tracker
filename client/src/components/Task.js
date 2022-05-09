import React from 'react'
import { FaFlag, FaTimes } from 'react-icons/fa'

const Task = ({ task, onToggleReminder, onToggleCompleted, onDelete }) => {
    return (
        <div 
            className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={() => onToggleReminder(task._id)}
        >
            <h3>
                <p className={`${task.completed ? 'completed' : ''}`}>{task.task}</p>
                <div>
                    <FaFlag 
                        onClick={() => onToggleCompleted(task._id)} 
                        style={{ 
                            margin: '0 10px 0 10px',
                            color: `${task.completed ? 'green' : ''}`
                        }}
                    />
                    <FaTimes 
                        onClick={() => onDelete(task._id)} 
                        style={{ 
                            margin: '0 10px 0 10px'
                        }} 
                    />
                </div>
            </h3>
        </div>
    )
}

export default Task