const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;

app.get('/summonerName/:summName', async (req, res) => {
    const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summName}`
    const response = await fetch(link, {
        headers: {
            'X-Riot-Token': `${process.env.RIOTAPI}`
        }
    });
    console.log(await response.json());
    return res.send();
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})