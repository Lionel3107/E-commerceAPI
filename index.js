const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user');
const app = express();

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected succesfully to MongoDB"))
.catch((error) => console.log(error));


//Middleware for body-passing
app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)


// Port for listenning
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));