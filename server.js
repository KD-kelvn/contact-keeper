const express = require('express');
const connectDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 5000;

const USERS = require('./routes/users');
const AUTH = require('./routes/auth');
const CONTACTS = require('./routes/contacts');

// connecting to database
connectDB();

app.use(express.json({extended: false}));
app.use('/api/users', USERS);
app.use('/api/auth', AUTH);
app.use('/api/contacts', CONTACTS);

app.get('/',(req, res)=> res.json({msg:"Hello from server app"}));
app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT);
});
