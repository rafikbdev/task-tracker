require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json())


const connectDB = require('./db/connect');

const taskRouter = require('./routes/task');

app.use('/api/v1/tasks', taskRouter)

const port = process.env.MONGO_PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()