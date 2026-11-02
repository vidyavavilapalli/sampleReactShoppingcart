const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.get('Origin');

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.vary('Origin');
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.sendStatus(204);
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Gateway server is running. Use POST /api/posts to proxy requests.');
});

app.post(['/api/posts', '/api/post'], async (req, res) => {
  console.log('Gateway received request at /api/posts:', req.body);

  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Gateway response from external API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Gateway error:', error.message);
    res.status(500).json({ error: 'error in api call', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});