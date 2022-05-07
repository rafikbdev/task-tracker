require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const connectDB = require('./db/connect');

const taskRouter = require('./routes/task');

// Error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');

// Routes
app.use('/api/v1/tasks', taskRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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