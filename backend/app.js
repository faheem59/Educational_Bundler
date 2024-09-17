const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/userRoute')
const course = require('./routes/courseRoutes');
const ErrorMiddleware = require('./middleware/Error');
const cookieParser = require('cookie-parser');
const enrollment = require('./routes/enrollmentRoutes')
const instructorRoutes = require('./routes/instructorRoutes');
const cors = require('cors')


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1', user)
app.use('/api/v1', enrollment)
app.use('/api/v1', course)
app.use('/api/v1', instructorRoutes);
app.use(ErrorMiddleware);


module.exports = app;
