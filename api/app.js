const express = require('express');
const app = express();

const taskRouter = require('./routes/task');

app.use('/api/v1/tasks', taskRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})