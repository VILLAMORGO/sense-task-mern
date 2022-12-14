const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
var cors = require('cors');

const port = process.env.PORT || 5000;

connectDB()

const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', require('./routes/todoRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log('listening on port ' + port));