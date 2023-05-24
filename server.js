const express = require('express');
const connectDB = require('./config/db')
const path = require('path');

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

if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))});
}
app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT);
});
