const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const GUILD_ID = process.env.GUILD_ID; // Your Discord server ID
const BOT_TOKEN = process.env.BOT_TOKEN; // Your bot token

app.get('/members', async (req, res) => {
  try {
    const response = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/guild', async (req, res) => {
  try {
    const response = await fetch(`https://discord.com/api/guilds/${GUILD_ID}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
