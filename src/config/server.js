const express = require('express');
require('dotenv').config();
const cors=require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/getByRiotID/:ign/:tag', async (req, res) => {
    const links = {
        // followed by: /ign/tag
        'getPuuid': 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id',
        // followed by: /puuid (obtained from getPuuid)
        'getSummonerInfo': 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid'
    }
    const headers = {
        headers: {
            'X-Riot-Token': `${process.env.RIOTAPI}`
        }
    }
    const response = await fetch(`${links.getPuuid}/${req.params.ign}/${req.params.tag}`, headers);
    const responseJson = await response.json();
    // returns if non successful get request
    if (responseJson.status) {
        return res.send("Please check the game name and/or tag");
    }

    const summonerResponse = await fetch(`${links.getSummonerInfo}/${responseJson.puuid}`, headers);
    const summonerResponseJson = await summonerResponse.json();
    return res.send(summonerResponseJson);
})

app.get('/getRankWR/:id', async (req, res) => {
    const links = {
        // get rank info by encrypted ID
        'getRankInfo': 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner'
    }
    const headers = {
        headers: {
            'X-Riot-Token': `${process.env.RIOTAPI}`
        }
    }
    const response = await fetch(`${links.getRankInfo}/${req.params.id}`, headers);
    const responseJson = await response.json();


    return res.send(responseJson);
})

app.get('/getMatchHistory/:puuid', async (req, res) => {
    const link = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.params.puuid}/ids?start=0&count=20`
    const headers = {
        headers: {
            'X-Riot-Token': `${process.env.RIOTAPI}`
        }
    }
    const response = await fetch(link, headers);
    const responseJson = await response.json();

    return res.send(responseJson);
})

app.get('/getMatchTimeline/:matchId', async (req, res) => {
    const link = `https://americas.api.riotgames.com/lol/match/v5/matches/${req.params.matchId}`
    const headers = {
        headers: {
            'X-Riot-Token': `${process.env.RIOTAPI}`
        }
    }
    const response = await fetch(link, headers);
    const responseJson = await response.json();

    return res.send(responseJson);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})