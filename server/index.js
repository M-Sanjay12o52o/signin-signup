const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());

const SECRET = 'SecR3t';

// Mongoose schemas

const userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
});

// Mongoose models

const User = mongoose.model('User', userSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// connect to mongodb

mongoose.connect('mongodb+srv://sanjayMERNDb:sanjayMERNDb@cluster1.re8rp8u.mongodb.net/signup', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "signup" });

console.log("DB URL: ", process.env.REACT_APP_DB_URL);

// User routes
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });

    // saving the new user to the database
    newUser.save()
      .then(() => {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating user" });
      });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});


app.listen(port, () => {
  console.log('Server running on port', port);
});
