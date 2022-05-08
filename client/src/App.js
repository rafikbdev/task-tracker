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

	return (
		<div className="container">
			{ tasks.length > 0 ? (
				<Tasks tasks={tasks} />
			): (
				"No tasks to show"
			)}
		</div>
	);
}

export default App;
