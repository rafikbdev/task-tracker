import React, { useState }from 'react'

const AddTask = ({ onAdd }) => {
    const [task, setText] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()

        if(!task) {
            alert('Please provide a task')
            return
        }
        onAdd({task, reminder})
        setText('')
        setReminder(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-controller'>
                <input 
                    type='text'
                    placeholder='Add Task'
                    value={task}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input 
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type='submit' value='Add Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask