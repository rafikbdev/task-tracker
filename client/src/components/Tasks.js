import React from 'react'
import Task from './Task'

const Tasks = ({ tasks, onToggleReminder }) => {
    return ( 
        <>
            {tasks.map((task) => (
                <Task 
                    key={task._id}
                    task={task}
                    onToggleReminder={onToggleReminder}
                />
            ))}
        </>
    )
}

export default Tasks;