const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Create a schema for user registration data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a model for user registration data
const User = mongoose.model('User', userSchema);

// Enable CORS for all routes
app.use(cors());

// Enable body parser middleware
app.use(bodyParser.json());

// Handle user registration form submissions
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Save the user data to MongoDB
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(201).send({ message: 'User created' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
