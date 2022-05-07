import React, { useState, useEffect } from 'react'

function App() {
	const [tasks, setTasks] = useState();

	useEffect(() => {
		const fetchTasks = async () => {
			const res = await fetch('http://localhost:5000/api/v1/tasks');
			const data = await res.json()
			console.log(data)
		}

		fetchTasks()
	}, [])

	return (
		<div><h1>Hello</h1></div>
	);
}

export default App;
