const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Joke = require('./models/Joke');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/joke', async (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
