import React from 'react'
import Task from './Task'

const Tasks = ({ tasks, onToggleReminder, onToggleCompleted }) => {
    return ( 
        <>
            {tasks.map((task) => (
                <Task 
                    key={task._id}
                    task={task}
                    onToggleReminder={onToggleReminder}
                    onToggleCompleted={onToggleCompleted}
                />
            ))}
        </>
    )
}

export default Tasks;