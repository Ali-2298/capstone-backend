const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const testJwtRouter = require('./controllers/test-jwt');
const authCtrl = require('./controllers/auth');
const usersCtrl = require('./controllers/users');
const backlogsCtrl = require('./controllers/backlogs');

const verifyToken = require('./middleware/verify-token');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());

app.use('/auth', authCtrl);
app.use('/test-jwt', testJwtRouter);

app.use(verifyToken);
app.use('/users', usersCtrl);
app.use('/backlogs', backlogsCtrl);

app.listen(PORT, () => {
  console.log('The express app is ready!');
});