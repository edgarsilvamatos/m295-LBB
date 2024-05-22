const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000

const tasks = require('./tasks');
const login = require('./login');

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(express.json())

app.use('/tasks', tasks);
app.use('/login', login);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });