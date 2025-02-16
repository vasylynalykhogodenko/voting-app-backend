const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const Joke = require('./models/Joke');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const fetchRandomJoke = async () => {
    try {
      const response = await axios.get('https://teehee.dev/api/joke');
      return {
        question: response.data.setup,
        answer: response.data.punchline,
        votes: [],
        availableVotes: ["😂", "👍", "❤️"],
      };
    } catch (err) {
      console.error('Failed to fetch joke from external API:', err);
      return null;
    }
};

app.get('/api/joke', async (req, res) => {
    try {
        const newJoke = await fetchRandomJoke();

        if (newJoke) {
          const savedJoke = await Joke.create(newJoke);
          res.json(savedJoke);
        }
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch a joke' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
