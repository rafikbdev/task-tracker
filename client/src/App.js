import React, { useState, useEffect } from 'react'
import Tasks from './components/Tasks'

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		}

		getTasks()
	}, [])

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/api/v1/tasks');
		const data = await res.json();
		return data
	};

	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`);
		const data = await res.json();
		return data
	};

	const deleteTask = async (id) => {
		const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
			method: 'DELETE',
			headers: { 
				'Content-type': 'application/json'
			}
		});

		const data = await res.json()
		console.log(data)
		
		setTasks(tasks.filter((task) => task._id !== id ))
	}

	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const upDatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

		const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
			method: 'PATCH',
			headers: { 
				'Content-type': 'application/json'
			},
			body: JSON.stringify(upDatedTask)
		})
		
		const data = await res.json();

		setTasks(tasks.map((task) => 
			task._id === id ? { ...task, reminder: data.reminder } 
			: task
		))
	}

	const toggleCompleted = async (id) => {
		const taskToToggle = await fetchTask(id);
		let upDatedTask = {};
		upDatedTask = { ...taskToToggle, completed: !taskToToggle.completed }

		if(upDatedTask.completed === true){
			upDatedTask.reminder = false;
		}

		const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
			method: 'PATCH',
			headers: { 
				'Content-type': 'application/json'
			},
			body: JSON.stringify(upDatedTask)
		})

		const data = await res.json()

		setTasks(tasks.map((task) =>
			task._id === id ? { ...task, completed: data.completed, reminder: data.reminder }
			: task
		))
	}

	return (
		<div className="container">
			{ tasks.length > 0 ? (
				<Tasks 
					tasks={tasks} 
					onToggleReminder={toggleReminder}
					onToggleCompleted={toggleCompleted}
					onDelete={deleteTask}
				/>
			): (
				"No tasks to show"
			)}
		</div>
	);
}

export default App;
