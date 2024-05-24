const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, dob, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret');
    res.json({ token, user: { name, email, dob } });
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
