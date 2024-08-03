const express = require('express');
const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/ticketing';

mongoose.connect(db);

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const ticketRouter = require('./routes/tickets');

const app = express();
app.use(express.json());

// Service health check
app.get('/', function(req, res){
	res.send('Ticket Management Service is up.');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/tickets', ticketRouter);

const PORT = 8801;

app.listen(PORT, function(){
	console.log(`Ticket Management Service serving on ${PORT}`);
});